
import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import { ExpandMore } from '@material-ui/icons/'
import { Accordion, AccordionSummary } from '@material-ui/core'

import CustomAccordion from './CustomAccordion'

// interface interfaceName {
//   value: string
// }

const MapComponent: React.FC = () => {
  const classes = useStyles()
  return (
    <div>
      <div className={classes.mapContainer}>
        <div className={classes.mapBox}>map box</div>
        <div className={classes.footer}>
          <div>2021-08</div>
          <div>tuulituhotunnistus</div>
          <div>button</div>
        </div>
        <div className={classes.menuContainer}>

          <div className={classes.dropDown}>
            <CustomAccordion />
          </div>




          <div className={classes.dropDown}>
            <CustomAccordion />
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
      height: '300px',
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
    },
  }))

export default MapComponent