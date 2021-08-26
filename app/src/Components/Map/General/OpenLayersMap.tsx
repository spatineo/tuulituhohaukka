import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import { updateMapExtent } from '../../../Store/Actions/data'
import { RootState } from '../../../App'
import * as ol from 'ol'
import OlMap from 'ol/Map'
import { MouseWheelZoom, defaults } from 'ol/interaction';
import * as layer from 'ol/layer'
import * as source from 'ol/source'
import 'ol/ol.css'

const mouseWheelZoomAnimationTime = 75;

const OpenLayersMap: React.FC = () => {
  const dispatch = useDispatch()
  const mapExtent = useSelector((state: RootState) => state.dataReducer.data.global.mapExtent)
  const [map, setMap] = React.useState<OlMap>()
  const mapRef = React.useRef<HTMLElement>()

  const initiaizeOL = React.useCallback(() => {
    const map = new ol.Map({
      interactions: defaults({ mouseWheelZoom: false }).extend([
        new MouseWheelZoom({
          duration: mouseWheelZoomAnimationTime,
        })]),
      target: mapRef.current,
      layers: [
        new layer.Tile({
          source: new source.OSM()
        })
      ],
      view: new ol.View({
        center: [0, 0],
        zoom: 1
      })
    })
    map.getView().fit([50199.4814, 6582464.0358, 761274.6247, 7799839.8902])
    return map
  }, [mapRef])

  const sendUpdateExtentAction = (event: any) => {
    const map = event.map;
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
    setMap(initiaizeOL())
  }, [])

  React.useEffect(() => {
    map?.on('postrender', sendUpdateExtentAction)
  }, [map])

  React.useEffect(() => {
    if (!map?.getView().getInteracting()) {
      map?.getView().setCenter(mapExtent.center)
      map?.getView().setResolution(mapExtent.resolution)
      map?.getView().setRotation(mapExtent.rotation)
    }
  }, [mapExtent])

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
      background: 'white'
    }
  }))

export default OpenLayersMap