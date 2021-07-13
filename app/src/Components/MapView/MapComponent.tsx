
import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import { ExpandMore } from '@material-ui/icons/'


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
          <div className={classes.dataSources}>
            Aineistot
            <ExpandMore />
          </div>
          <div className={classes.visualization}>
            Visualisointi
            <ExpandMore />
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
      borderBottom: 'solid black 1px',
      borderLeft: 'solid black 1px',
      borderRight: 'solid black 1px',
      borderBottomLeftRadius: '5px',
      borderBottomRightRadius: '5px',
    },
    dataSources: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      paddingLeft: '30px',
      paddingRight: '10px',
      borderRight: 'solid black 1px'
    },
    visualization: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      paddingLeft: '30px',
      paddingRight: '10px',
    }
  }))

export default MapComponent