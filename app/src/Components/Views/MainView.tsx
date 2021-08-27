import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadInitialSetup, setStateFromUrl } from '../../Store/Actions/data'
import { Button, Divider, Grid } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import MapView from './MapView'
import SidePanel from './SidePanel'
import { RootState } from '../../App';

const MainView: React.FC = (props: any) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const globalState = useSelector((state: RootState) => state.dataReducer.data.global)
  const mapArray = useSelector((state: RootState) => state.dataReducer.data.maps)

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
          mapLayers: [[]]
        }
      }
    })

    const newStateObject = {
      data: {
        global: globalState,
        maps: filteredMaps
      }
    }
    const objectAsString = JSON.stringify(newStateObject)
    const URL = encodeURI(`http://localhost:3000/stateData/${objectAsString}`)
    console.log('URL with state: ', URL)
    return URL
  }

  React.useEffect(() => {
    const currentUrl = props.location.pathname
    if (currentUrl === '/') {
      dispatch(loadInitialSetup())
    }
    else if (currentUrl.includes('/stateData')) {
      const stateData = currentUrl.slice(11)
      const stateDataObject = JSON.parse(decodeURI(stateData))
      dispatch(setStateFromUrl(stateDataObject))
    }
  }, [])

  React.useEffect(() => {
    window.history.replaceState(null, "New Page Title", "/")
  }, [globalState])

  return (
    <div className="App">
      <Typography variant='h4'>Tuulituhohaukka 🌪 💥 🦅 </Typography>
      <h1></h1>
      <Button variant='contained' onClick={() => {
        window.prompt('Copy the link from here ⬇️', createUrl())
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