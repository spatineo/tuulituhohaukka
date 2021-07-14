import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { loadData } from '../Store/Actions/data'
import { useEffect } from 'react';
import { Grid } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles';

import MapView from '../Components/MapView/MapView'
import SidePanel from '../Components/SidePanel/SidePanel'


const MainView = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const data = useSelector((state: any) => state.data)
  console.log(data)

  const getDataFromRedux = () => {
    dispatch(loadData())
  }

  return (
    <div className="App">
      <h1>Tuulituhohaukka 🌪 💥 🦅 </h1>
      <button
        className={classes.reduxLoadButton}
        onClick={() => getDataFromRedux()}>
        Load data and get it from Redux
      </button>

      <div className={classes.root}>
        <Grid container className={classes.container}>
          <Grid item xs={4} md={3} lg={2} className={classes.border}>
            <SidePanel />
          </Grid>
          <Grid item xs={8} md={9} lg={10} className={classes.border}>
            <MapView />
          </Grid>
        </Grid>
      </div>
    </div>
  );
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
      border: 'solid black 1px'
    },
    container: {
      height: '100%'
    }
  })
)


export default MainView;