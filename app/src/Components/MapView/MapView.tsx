import * as React from 'react'
import { createStyles, makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import { Button, Grid, Card, GridList } from '@material-ui/core'

import MapComponent from './MapComponent'

// interface interfaceName {
//   value: string
// }

const greenTheme = createMuiTheme({
  palette: {
    primary: green
  }
})

const MapView: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.addButtonContainer}>
      <ThemeProvider theme={greenTheme}>
        <Button
          variant="contained"
          color="primary"
          style={{ aspectRatio: '1/1', color: 'white', fontWeight: 'bold', fontSize: '25px' }}
        >
          +
        </Button>
      </ThemeProvider>
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
      heigt: '100%',
      flexDirection: 'row',
    },
    addButtonContainer: {
      height: '1000px',
      border: 'solid black 1px'
    },
    border: {
      border: 'solid black 1px'
    }
  }))

export default MapView