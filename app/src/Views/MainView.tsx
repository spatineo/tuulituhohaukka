import React from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { loadCatalog, loadData } from '../Store/Actions/data'
import { Button, Divider, Grid } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Data } from '../types'
import { Typography } from '@material-ui/core';

import MapView from './MapView'
import SidePanel from './SidePanel'

import { getAllDatasets } from '../API/Api';

const MainView = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [datasets, setDatasets] = React.useState<Array<any>>()

  const getDataFromRedux = () => {
    batch(() => {
      dispatch(loadCatalog({ url: '/Testdata/root.json' }))
      dispatch(loadData())
    })
  }

  React.useEffect(() => {
    console.log('Inializing app. Dispatching actions to fetch data')
    getDataFromRedux()
  }, [])


  console.log('datasets from catalog: ', datasets)

  return (
    <div className="App">
      <Typography variant='h4'>Tuulituhohaukka 🌪 💥 🦅 </Typography>
      <h1></h1>
      <Button variant='contained' onClick={() => {
        setDatasets(getAllDatasets())
      }}>
        fetch datasets!
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