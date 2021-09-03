import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import { updateMapExtent } from '../../../Store/Actions/data'
import TileLayer from 'ol/layer/WebGLTile';
import GeoTIFF, { SourceInfo } from 'ol/source/GeoTIFF';
import Projection from 'ol/proj/Projection';
import * as ol from 'ol'
import { MouseWheelZoom, defaults } from 'ol/interaction';
import 'ol/ol.css'

interface State {
  showLens: boolean
  map: any
}

const RED = 0;
const GREEN = 1;
const BLUE = 2;

const projection = new Projection({
  code: 'EPSG:3067',
  extent: [50199.4814, 6582464.0358, 761274.6247, 7799839.8902],
});

const mouseWheelZoomAnimationTime = 75;

interface Props {
  item: any,
  datasetCatalog: any,
  channelSettings: any
}

const OpenLayersMap: React.FC<Props> = ({ item, datasetCatalog, channelSettings }) => {
  const mapExtent = useSelector((state: any) => state.dataReducer.data.global.mapExtent)
  const sidebarIsOpen = useSelector((state: any) => state.dataReducer.data.global.sidebarIsOpen)
  const dispatch = useDispatch()

  // const initialState = {
  //   showLens: false,
  //   map: null,
  //   sources: []
  // }





  const [map, setMap] = React.useState<any>()
  const mapRef = React.useRef<HTMLElement>()

  const initializeOL = React.useCallback(() => {
    console.log('Initialize!')
    const map = new ol.Map({
      interactions: defaults({ mouseWheelZoom: false }).extend([
        new MouseWheelZoom({
          duration: mouseWheelZoomAnimationTime,
        })]),
      target: mapRef.current,
      layers: [],
      view: new ol.View({
        center: mapExtent.center,
        resolution: mapExtent.resolution,
        rotation: mapExtent.rotation,
        projection: projection
      })
    })
    map?.on('postrender', sendUpdateExtentAction)
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
    dispatch(updateMapExtent(payload))
  }

  React.useEffect(() => {
    setMap(initializeOL())
  }, [])

  // This function will resize map when page is manually resize
  window.onresize = () => {
    setTimeout(function () { map.updateSize(); }, 1000);
  }

  // This function should resize map when sidebar is opened or closed
  React.useEffect(() => {
    map && map.updateSize()
  }, [sidebarIsOpen])


  React.useEffect(() => {
    if (!map?.getView().getInteracting()) {
      map?.getView().setCenter(mapExtent.center)
      map?.getView().setResolution(mapExtent.resolution)
      map?.getView().setRotation(mapExtent.rotation)
    }
  }, [mapExtent])


  React.useEffect(() => {
    const colors = [{ colorStr: 'R', color: RED }, { colorStr: 'G', color: GREEN }, { colorStr: 'B', color: BLUE }];

    function getVisualisation(band : string) {
      let visualisationParameters = datasetCatalog?.summaries?.visualisation_parameters?.bands?.find((b : any) => b.band === band);
      if (!visualisationParameters) {
        visualisationParameters = {
          band: band,
          min: 0,
          max: 1
        }
      }

      return visualisationParameters;
    }

    const sources = colors
      .filter(c => channelSettings[c.colorStr])
      .filter(c => item && item.assets && item.assets[channelSettings[c.colorStr]])
      .map(c => {
        const vis = getVisualisation(channelSettings[c.colorStr]);
        return {
          url: item.assets[channelSettings[c.colorStr]].sourceUrl,
          color: c.color,
          min: vis.min,
          max: vis.max
        }
      });

    // adds bands together for a single color value
    function sumBands(sources: { url: string, color: number }[], targetColor: number) {
      return sources.reduce((memo, source, i) => {
        if (source.color !== targetColor) { return memo; }
        const item = ['band', i + 1]
        if (memo === 0) {
          memo = item;
        } else {
          memo = ['+', memo, item]
        }
        return memo;
      }, 0 as any)
    }

    const oldLayers = map?.getLayers() || [];
    oldLayers.forEach((l: any) => map?.removeLayer(l))

    const layer = new TileLayer({
      style: {
        color:
          ['color',
            ['*', 255, ['clamp', sumBands(sources, RED), 0, 1]],
            ['*', 255, ['clamp', sumBands(sources, GREEN), 0, 1]],
            ['*', 255, ['clamp', sumBands(sources, BLUE), 0, 1]]
          ]
      },
      source: new GeoTIFF({
        sources:
          sources.map(s => {
            return {
              url: s.url,
              //nodata: 0, !!! Important!
              bands: [0],
              min: s.min,
              max: s.max
            }
          })
      })
    })
    map?.addLayer(layer);

  }, [item, datasetCatalog, channelSettings]);

  const classes = useStyles()
  return (
    <div ref={mapRef as any} className={classes.mapContainer}>
      <div className={classes.crossHair} />
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    mapContainer: {
      heigh: '100%',
      width: '100%',
      border: 'solid black 1px',
      background: 'black'
    },
    crossHair: {
      pointerEvents: 'none',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundImage: 'url("crosshair.svg")',
      backgroundSize: '80% 80%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      margin: 0,
      padding: 0,
      zIndex: 10000,
      position: 'absolute'
    }
  }))

export default OpenLayersMap
