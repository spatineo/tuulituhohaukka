import * as React from 'react'
import { useDispatch } from 'react-redux'
import { addMap } from '../../Store/Actions/data'
import { RootState } from '../../App'
import { createStyles, makeStyles, ThemeProvider, createMuiTheme, } from '@material-ui/core/styles'
import { createTheme } from '@material-ui/lab/node_modules/@material-ui/system'
import { green } from '@material-ui/core/colors'
import { Button, Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import MapComponent from '../Map/General/MapComponent'
import { getAllDatasets } from '../../API/Api'

import { Dataset } from '../../types'
const greenTheme = createMuiTheme({
  palette: {
    primary: green
  }
})

const MapView: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const mapData = useSelector((state: RootState) => state.dataReducer.data.maps)
  const latestMapIndex = mapData.length - 1
  const datasets = getAllDatasets() as Dataset[]
  const cache = useSelector((state: RootState) => state.dataReducer.cache)

  React.useEffect(() => {
    getAllDatasets()
  }, [cache])

  const payload = {
    "mapObject": {
      "id": latestMapIndex + 1,
      "selectedDataset": "Sentinel-2_global_mosaic_dekadi",
      "channelSettings": {
        "R": "b04",
        "G": "b03",
        "B": "b01"
      },
      "displayWindDamageVector": true,
      "displaySpyglass": false,
      "panelBarSettings": {
        "displayDataSourceList": false,
        "displayVisualization": false
      },
      "derivedData": {
        "sources": [],
        "timeValues": {
          "inspection": "",
          "comparison": ""
        },
        "mapLayers": [[]]
      }
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.buttonContainer}>
        <ThemeProvider theme={greenTheme}>
          <Button
            variant="contained"
            color="primary"
            size='large'
            style={{ color: 'white', fontWeight: 'bold', fontSize: '27px', aspectRatio: '1:1', borderRadius: '50px' }}
            onClick={() => dispatch(addMap(payload))}
          >
            +
          </Button>
        </ThemeProvider>
      </div>
      <Grid container justify='flex-start' spacing={6} >
        {mapData.map((mapObject, index) => {
          return (
            <Grid key={mapObject.id} container direction='column' item xs={12} md={12} lg={6} xl={4} alignItems='center' >
              <MapComponent
                mapObject={mapObject}
                mapComponentIndex={index}
                datasets={datasets}
              />
            </Grid>)
        })}
      </Grid>
      <div style={{ width: '100px' }} />
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
    },
    buttonContainer: {
      position: 'absolute',
      right: '0',
      bottom: '0',
      padding: '15px',
    },
  }))

export default MapView

