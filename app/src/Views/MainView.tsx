import React from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { loadRootCatalog, loadData } from '../Store/Actions/data'
import { Button, Divider, Grid } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Data } from '../types'
import { Typography } from '@material-ui/core';

import MapView from './MapView'
import SidePanel from './SidePanel'

const MainView = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const rootCatalog = useSelector((state: any): any => state.dataReducer.cache.catalog)

  const getDataFromRedux = () => {
    batch(() => {
      dispatch(loadRootCatalog('/Testdata/root.json'))
      dispatch(loadData())
    })

  }

  React.useEffect(() => {
    getDataFromRedux()
  }, [])

  console.log('rootCatalog: ', rootCatalog)

  return (
    <div className="App">
      <Typography variant='h4'>Tuulituhohaukka 🌪 💥 🦅 </Typography>
      <h1></h1>
      <Button variant='contained' onClick={() => {
        console.log('Dispatching action loadRootCatalog action again!')
        dispatch(loadRootCatalog('/Testdata/root.json'))
      }}>
        fetch catalog!
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