import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import { Grid, Card } from '@material-ui/core'

import SelectMonth from './SelectMonth'
// interface SidePanelProps {

// }

import SelectTime from './SelectTime'

const SidePanel: React.FC = () => {
  const classes = useStyles()
  return (
    <div >
      <Grid container direction="column" justify="center" alignItems="center" spacing={2} >
        <Grid item style={{ width: '90%', padding: '10px' }}>
          <SelectMonth />
        </Grid>
        <Grid item style={{ width: '90%' }} >
          <Card style={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <SelectTime />
          </Card>
        </Grid>
      </Grid>
    </div >

  )
}

const useStyles = makeStyles(() =>
  createStyles({

  })
)

export default SidePanel
