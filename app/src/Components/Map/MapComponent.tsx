
import * as React from 'react'
import { useSelector } from 'react-redux'
import { ReduxState, Source } from '../../types'
import { createStyles, makeStyles } from '@material-ui/styles'
import SlimAccordion from './SlimAccordion'
import OpenLayersMap from './OpenLayersMap'
import { Map } from '../../types'

import DataSourceList from './SourceList/DataSourceList'
import NormalVisualization from './Visualization/NormalVisualization'

interface Props {
  data: Map
}

const MapComponent: React.FC<Props> = () => {
  const sources = useSelector((state: any): Array<Source> => state.dataReducer.cache.sources)
  console.log('sources form Redux: ', sources)

  // 1. Fetch channel settings data from redux

  const classes = useStyles()
  return (
    <div>
      <div className={classes.mapContainer}>
        <div className={classes.mapBox}>
          <OpenLayersMap />
        </div>
        <div className={classes.footer}>
          <div>2021-08</div>
          <div>tuulituhotunnistus</div>
          <div>button</div>
        </div>
        <div className={classes.menuContainer}>
          <div className={classes.dropDown}>
            <SlimAccordion name={'Aineistot'}>
              <DataSourceList sources={sources} />
            </SlimAccordion>
          </div>
          <div className={classes.dropDown}>
            {/* 2. pass Channel settings data to NormalVisualization component */}
            <SlimAccordion name={'Visualisointi'}>
              <NormalVisualization />
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