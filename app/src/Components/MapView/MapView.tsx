import * as React from 'react'
import { createStyles, makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import { Button, Grid } from '@material-ui/core'

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
    <div className={classes.container}>
      <div className={classes.buttonContainer}>
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
      <div className={classes.mapsContainer}>
        <Grid container justify='flex-start' spacing={10}>
          <Grid container direction='column' item xs={4} alignItems='center'>
            <MapComponent />
          </Grid>
          <Grid container direction='column' item xs={4} alignItems='center'>
            <MapComponent />
          </Grid>
          <Grid container direction='column' item xs={4} alignItems='center'>
            <MapComponent />
          </Grid>
          <Grid container direction='column' item xs={4} alignItems='center'>
            <MapComponent />
          </Grid>
          <Grid container direction='column' item xs={4} alignItems='center'>
            <MapComponent />
          </Grid>
        </Grid>
      </div>

    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'row',
    },
    buttonContainer: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      border: 'solid red 1px',
      padding: '1rem',
    },
    mapsContainer: {
      width: '100%',
      height: '100%',
      border: 'solid blue 1px'
    }
  }))

export default MapView

