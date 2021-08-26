import React from 'react';
import { useDispatch } from 'react-redux';
import { loadInitialSetup, setAllDatasets, setBands } from '../../Store/Actions/data'
import { Button, Divider, Grid } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import MapView from './MapView'
import SidePanel from './SidePanel'
import { getAllDatasets, getBandsForDataset } from '../../API/Api';

const MainView: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(loadInitialSetup())
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