import * as React from 'react'
import { useDispatch } from 'react-redux'
import { addMap } from '../../Store/Actions/data'
import { RootState } from '../../App'
import { createStyles, makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
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
      "selectedDataset": "id of the source",
      "channelSettings": {
        "R": "",
        "G": "",
        "B": ""
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
            style={{ color: 'white', fontWeight: 'bold', fontSize: '25px' }}
            onClick={() => dispatch(addMap(payload))}
          >
            +
          </Button>
        </ThemeProvider>
      </div>
      <Grid container justify='flex-start' spacing={6} style={{ width: '100%', height: '100%' }}>
        {mapData.map((mapObject, index) => {
          return (
            <Grid key={mapObject.id} container direction='column' item xs={12} lg={6} xl={4} alignItems='center' >
              <MapComponent
                mapObject={mapObject}
                mapComponentIndex={index}
                datasets={datasets}
              />
            </Grid>)
        })}
      </Grid>
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginLeft: '10px',
      marginRight: '10px',
    },
  }))

export default MapView

