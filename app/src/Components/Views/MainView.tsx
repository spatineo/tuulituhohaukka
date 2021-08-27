import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadInitialSetup, setAllDatasets, setBands, setStateFromUrl } from '../../Store/Actions/data'
import { Button, Divider, Grid } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import MapView from './MapView'
import SidePanel from './SidePanel'
import { getAllDatasets, getBandsForDataset } from '../../API/Api';
import { RootState } from '../../App';
import { create } from 'ol/transform';

const MainView: React.FC = (props: any) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const globalState = useSelector((state: RootState) => state.dataReducer.data.global)
  const mapArray = useSelector((state: RootState) => state.dataReducer.data.maps)

  console.log('MapArray froms state: ', mapArray)
  // 1. Get wanted state from redux
  // 2. Run state through JSON.stringify
  // 3. Compress the string somehow..

  const createUrl = () => {
    const filteredMaps = mapArray.map((mapObject, index) => {
      return {
        id: index,
        selectedDataset: mapObject.selectedDataset,
        channelSettings: mapObject.channelSettings,
        displayWindDamagedVector: mapObject.displayWindDamageVector,
        displaySpyGlass: mapObject.displaySpyGlass,
        panelBarSettings: mapObject.panelBarSettings,
        derivedData: {
          bands: [],
          timeValues: {
            inspection: '',
            comparison: '',
          },
          mapLayers: [
            [
            ]
          ]
        }
      }
    })

    const newObject = {
      data: {
        global: globalState,
        maps: filteredMaps
      }
    }
    console.log('New objects created for URL: ', newObject)
    const objectAsString = JSON.stringify(newObject)
    console.log('Object as string: ', objectAsString)
    const URL = `http://localhost:3000/stateData/${objectAsString}`
    console.log('URL with state: ', URL)
  }

  createUrl()

  React.useEffect(() => {
    console.log('Props in mainView: ', props)
    const currentUrl = props.location.pathname
    console.log('current url is: ', currentUrl)

    if (currentUrl === '/') {
      dispatch(loadInitialSetup())
    }
    else if (currentUrl.includes('/stateData')) {

      const stateData = currentUrl.slice(11)
      console.log('Sliced stateData: ', stateData)
      const stateDataObject = JSON.parse(stateData)
      console.log('Generated JSON: ', stateDataObject)
      dispatch(setStateFromUrl(stateDataObject))
    }

  }, [])

  return (
    <div className="App">
      <Typography variant='h4'>Tuulituhohaukka 🌪 💥 🦅 </Typography>
      <h1></h1>
      <Button variant='contained' onClick={() => {
        dispatch(setAllDatasets(getAllDatasets()))
      }}>
        fetch datasets!
      </Button>
      <Button variant='contained' onClick={() => {
        dispatch(setBands(getBandsForDataset('dataset-S1M')))
      }}>
        fetch bands for dataset!
      </Button>
      <Button variant='contained' onClick={() => {
        createUrl()
      }}>
        Copy URL to clipboard
      </Button>
      <Divider />
      <div className={classes.root}>
        <Grid container className={classes.container}>
          <Grid item xs={4} lg={3} xl={2} className={classes.border}>
            <SidePanel />
          </Grid>
          <Grid item xs={8} lg={9} xl={10} >
            <MapView />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    reduxLoadButton: {
      margin: '50px',
    },
    root: {
      flexGrow: 1,
      height: '1000px',
    },
    border: {
      border: 'solid black 1px',
      borderRadius: '10px'
    },
    container: {
      height: '100%'
    }
  })
)

export default MainView;