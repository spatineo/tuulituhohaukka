import * as React from 'react'
import { createStyles, makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import { Button, Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { ReduxState, Map } from '../types'

import MapComponent from '../Components/Map/MapComponent'

// interface interfaceName {
//   value: string
// }

const greenTheme = createMuiTheme({
  palette: {
    primary: green
  }
})

const MapView: React.FC = () => {
  const mapData = useSelector((state: any): Array<Map> => state.dataReducer.data.maps)
  console.log('Map data from Redux:', mapData)

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
        <Grid container justify='flex-start' spacing={6} style={{ width: '100%' }}>

          {mapData.map(mapObject => {
            return (
              <Grid container direction='column' item xs={12} lg={6} xl={4} alignItems='center'>
                <MapComponent data={mapObject} />
              </Grid>)
          })}
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
      aspectRatio: '1/1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginLeft: '10px',
      marginRight: '10px',
    },
    mapsContainer: {
      height: '100%',
      width: '100%',
      // border: 'solid blue 1px'
    }
  }))

export default MapView

