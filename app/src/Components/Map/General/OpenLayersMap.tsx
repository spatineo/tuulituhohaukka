import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import { updateMapExtent } from '../../../Store/Actions/data'
import TileLayer from 'ol/layer/WebGLTile';
import GeoTIFF, { SourceInfo } from 'ol/source/GeoTIFF';
import Projection from 'ol/proj/Projection';
import * as ol from 'ol'
import { MouseWheelZoom, defaults } from 'ol/interaction';
import {getCenter} from 'ol/extent';
import 'ol/ol.css'

interface State {
  showLens: boolean
  map: any
}


const mouseWheelZoomAnimationTime = 75;

interface Props {
  item: any,
  channelSettings: any
}

const OpenLayersMap: React.FC<Props> = ({ item, channelSettings }) => {
  const mapExtent = useSelector((state: any) => state.dataReducer.data.global.mapExtent)

  const dispatch = useDispatch()

  const initialState = {
    showLens: false,
    map: null,
    sources: []
  }

  const [map, setMap] = React.useState<any>()
  const mapRef = React.useRef<HTMLElement>()

  const projection = new Projection({
    code: 'EPSG:3067',
    extent: [50199.4814, 6582464.0358, 761274.6247, 7799839.8902],
  });

  const initializeOL = React.useCallback(() => {
    const map = new ol.Map({
      interactions: defaults({ mouseWheelZoom: false }).extend([
        new MouseWheelZoom({
          duration: mouseWheelZoomAnimationTime,
        })]),
      target: mapRef.current,
      layers: [],
      view: new ol.View({
        center: getCenter(projection.getExtent()),
        //extent: sourceExtent,
        zoom: 1,
        projection: projection
      })
    })
    return map
  }, [mapRef])

  const sendUpdateExtentAction = (evt: any) => {
    const map = evt.map;
    const center = map.getView().getCenter()
    const resolution = map.getView().getResolution()
    const rotation = map.getView().getRotation()
    const payload = {
      center: center,
      resolution: resolution,
      rotation: rotation,
    }
    // console.log('Map moved. Dispatching action to set new extent!')
    dispatch(updateMapExtent(payload))
  }

  React.useEffect(() => {
    setMap(initializeOL())
  }, [])

  React.useEffect(() => {
    map?.on('moveend', sendUpdateExtentAction)
  }, [map])

  React.useEffect(() => {
    //if (!map?.getView().getInteracting()) {
      map?.getView().setCenter(mapExtent.center)
      map?.getView().setResolution(mapExtent.resolution)
      map?.getView().setRotation(mapExtent.rotation)
    //}
  }, [mapExtent])


  React.useEffect(() => {
    //const sources : {url: string, color: number, min: number, max: number} [] = []
    console.log('THEITEMzzzz', item, channelSettings)

    const colors = [{colorStr: 'R', color: 0 }, {colorStr: 'G', color: 1}, {colorStr: 'B', color: 2}];
    
    const min = (item && item.id && item.id.indexOf('Sentinel-1') !== -1) ? -48 : 0;
    const max = (item && item.id && item.id.indexOf('Sentinel-1') !== -1) ? 34  : 2000;
    
    const sources = colors
      .filter(c => channelSettings[c.colorStr])
      .filter(c => item && item.assets && item.assets[channelSettings[c.colorStr]])
      .map(c => { return {
        url: item.assets[channelSettings[c.colorStr]].sourceUrl,
        color: c.color,
        min: min,
        max: max
      }});

    // adds bands together for a single color value
    function sumBands(sources : {url: string, color: number }[], targetColor: number) {
      return sources.reduce((memo, source, i) => {
        if (source.color !== targetColor) { return memo; }
          const item = ['band', i+1]
          if (memo === 0) {
              memo = item; // TODO
          } else {
              memo = ['+', memo, item]
          }
          return memo;
      }, 0 as any)
    }
    
    const red   = ['clamp', sumBands(sources, 0), 0, 1]
    const green = ['clamp', sumBands(sources, 1), 0, 1]
    const blue  = ['clamp', sumBands(sources, 2), 0, 1]
    
    console.log('----------- RED\n', JSON.stringify(red))
    console.log('----------- GREEN\n', JSON.stringify(green))
    console.log('----------- BLUE\n', JSON.stringify(blue))


    const oldLayers = map?.getLayers() || [];
    oldLayers.forEach((l : any) => map?.removeLayer(l))

    const layer = new TileLayer({
      style: { color:
          ['color', 
            ['*', 255, red   ],
            ['*', 255, green ],
            ['*', 255, blue  ]
          ]
      },
      source: new GeoTIFF({
        sources:
          sources.map(s => { return {
            url: s.url,
            //nodata: 0, !!! Important!
            bands: [0],
            min: s.min,
            max: s.max
          }})
      })
    })
    map?.addLayer(layer);
  
  }, [item, channelSettings]);

  const classes = useStyles()
  return (
    <div ref={mapRef as any} className={classes.mapContainer} />
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    mapContainer: {
      heigh: '100%',
      width: '100%',
      border: 'solid black 1px',
      background: 'black'
    }
  }))

export default OpenLayersMap
