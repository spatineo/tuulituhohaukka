import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { loadData } from '../Store/Actions/data'
import { Divider, Grid } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Data } from '../types'
import { Typography, AppBar } from '@material-ui/core';

import MapView from './MapView'
import SidePanel from './SidePanel'


const MainView = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const data = useSelector((state: any): Data => state.dataReducer.data)

  const getDataFromRedux = () => {
    dispatch(loadData())
  }

  React.useEffect(() => {
    getDataFromRedux()
  }, [])

  return (
    <div className="App">
      <Typography variant='h4'>Tuulituhohaukka 🌪 💥 🦅 </Typography>
      <h1></h1>
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
      border: 'solid black 1px',
      borderRadius: '10px'
    },
    container: {
      height: '100%'
    }
  })
)


export default MainView;