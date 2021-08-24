
import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Source } from '../../types'
import { createStyles, makeStyles } from '@material-ui/styles'
import { Grid, Button } from '@material-ui/core'
import SlimAccordion from './SlimAccordion'
import OpenLayersMap from './OpenLayersMap'
import { Map } from '../../types'

import { removeMap } from '../../Store/Actions/data'

import SourceList from './ListComponents/SourceList'
import NormalVisualization from './Visualization/NormalVisualization'

import { getAllDatasets } from '../../API/Api'

interface Props {
  mapObject: Map,
  mapComponentIndex: number
}

const MapComponent: React.FC<Props> = ({ mapObject, mapComponentIndex }) => {
  const cache = useSelector((state: any): any => state.dataReducer.cache)
  const sources = getAllDatasets() as Source[]
  const dateFromRedux = useSelector((state: any): string => state.dataReducer.data.global.inspectionDate)
  const editedDate = new Date(dateFromRedux).toISOString().split("T")[0]
  const classes = useStyles()
  const dispatch = useDispatch()

  React.useEffect(() => {
    getAllDatasets()
  }, [cache])

  return (
    <div>
      <div className={classes.mapContainer}>
        <div className={classes.mapBox}>
          <Button
            style={{ position: 'absolute', zIndex: 2, maxWidth: '40px', minWidth: '40px', aspectRatio: '1/1', right: '0px' }} size='small' variant="contained" color="secondary"
            onClick={() => dispatch(removeMap({ id: mapObject.id }))}
          >
            -
          </Button>
          <OpenLayersMap />
        </div>
        <div className={classes.footer}>
          <Grid container>
            <Grid container item xs={4} justify='center' alignItems='center' spacing={1}>
              <Grid item >
                <div style={{ color: '#00a9f7', fontSize: '11px' }}>another date </div>
              </Grid>
              <Grid item>
                <div style={{ color: '#ff0000', fontSize: '11px' }}>{editedDate}</div>
              </Grid>
            </Grid>
            <Grid container item xs={4} justify='center' alignItems='center'>
              <div style={{ fontSize: '14px' }}>Tuulituhotunnistus</div>
            </Grid>
            <Grid container item xs={4} justify='center'>
              <div style={{ fontSize: '14px', border: 'solid black 1px', borderRadius: ' 5px', padding: '6px' }}>button</div>
            </Grid>
          </Grid>
        </div>
        <div className={classes.menuContainer}>
          <div className={classes.dropDown}>

            <SlimAccordion name={'Aineistot'}>
              <SourceList sources={sources} mapComponentIndex={mapComponentIndex} />
            </SlimAccordion>
          </div>
          <div className={classes.dropDown}>
            <SlimAccordion name={'Visualisointi'}>
              <NormalVisualization channelSettings={mapObject.channelSettings} mapComponentIndex={mapComponentIndex} />
            </SlimAccordion>
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    mapContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: '350px',
      aspectRatio: '4/3',
    },
    mapBox: {
      display: 'flex',
      border: 'solid black 1px',
      height: '75%',
      width: '100%',
      position: 'relative',
    },
    footer: {
      display: 'flex',
      height: '15%',
      width: '100%',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      borderBottom: 'solid black 1px',
      borderLeft: 'solid black 1px',
      borderRight: 'solid black 1px'
    },
    menuContainer: {
      display: 'flex',
      height: '10%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dropDown: {
      width: '100%',
      height: '100%',
      zIndex: 10,
    },
  }))

export default MapComponent