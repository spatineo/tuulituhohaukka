import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import { Grid, Card } from '@material-ui/core'


// interface SidePanelProps {

// }

import SelectMonth from './SelectMonth'

const SidePanel: React.FC = () => {
  const classes = useStyles()
  return (
    <div>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item style={{ width: '80%' }}>
          <Card className={classes.monthPicker}>
            <div>
              This is the month selector
            </div>
          </Card>
        </Grid>

        <Grid item style={{ width: '80%' }}>
          <Card className={classes.dayPicker}>
            <div>
              This is the day selector
            </div>
          </Card>
        </Grid>

      </Grid>
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    monthPicker: {
      display: 'flex',
      aspectRatio: '4/2',
      width: '100%',
      marginTop: '10px',
      border: 'solid black 1px',
      justifyContent: 'center',
      alignItems: 'center'

    },
    dayPicker: {
      display: 'flex',
      width: '100%',
      marginBottom: '10px',
      aspectRatio: '100/110',
      border: 'solid black 1px',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
)

export default SidePanel
