
import * as React from 'react'
import { useSelector } from 'react-redux'
import { ReduxState, Source } from '../../types'
import { createStyles, makeStyles } from '@material-ui/styles'
import SlimAccordion from './SlimAccordion'
import Map from './Map'

import DataSourceList from './SourceList/DataSourceList'
import NormalVisualization from './Visualization/NormalVisualization'

// interface interfaceName {
//   value: string
// }

const MapComponent: React.FC = () => {
  const sources = useSelector((state: ReduxState): Array<Source> => state.data.cache.sources)

  const classes = useStyles()
  return (
    <div>
      <div className={classes.mapContainer}>
        <div className={classes.mapBox}>
          <Map />
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