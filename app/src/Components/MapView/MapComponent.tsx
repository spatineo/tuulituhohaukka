
import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import { Card } from '@material-ui/core'

// interface interfaceName {
//   value: string
// }

const MapComponent: React.FC = () => {
  const classes = useStyles()
  return (
    <Card className={classes.mapContainer}>

    </Card>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    mapContainer: {
      height: '200px',
      aspectRatio: '2/3',
    }
  }))

export default MapComponent