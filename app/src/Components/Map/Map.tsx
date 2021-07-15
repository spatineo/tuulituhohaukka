import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'

import * as ol from 'ol'
import * as layer from 'ol/layer'
import * as source from 'ol/source'
import * as style from 'ol/style'
import * as extent from 'ol/extent'
import 'ol/ol.css'

interface State {
  showLens: boolean
  map: any
}

const Map: React.FC = () => {

  const initialState = {
    showLens: false,
    map: null
  }

  const [state, setState] = React.useState<State>(initialState)
  const mapRef = React.useRef()

  const initiaizeOL = React.useCallback(() => {
    const map = new ol.Map({
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
    setState({
      showLens: false,
      map
    })
  }, [mapRef])


  React.useEffect(() => {
    initiaizeOL()
  }, [])

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

export default Map