import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'

import ChannelColorTile from './ChannelColorTile'
import SlimAccordion from '../SlimAccordion'
import DataSourceList from '../SourceList/DataSourceList'

// interface interfaceName {
//   value: string
// }

const NormalVisualization: React.FC = () => {
  const classes = useStyles()

  const sources = [
    {
      name: 'VV'
    },
    {
      name: 'VH'
    }
  ]

  return (
    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
      <Grid container direction='column' spacing={2}>
        <Grid container item direction='row' spacing={1}>
          <Grid item xs={4}>
            <ChannelColorTile text={'VV'} letter={'R'} color={'red'} />
          </Grid>
          <Grid item xs={4}>
            <ChannelColorTile text={'VV'} letter={'G'} color={'rgb(70,198,25)'} />
          </Grid>
          <Grid item xs={4}>
            <ChannelColorTile text={'VV'} letter={'B'} color={'rgb(0,143,225)'} />
          </Grid>
        </Grid>

        <Grid container item justify='center' >
          <SlimAccordion name={'list'}>
            <DataSourceList sources={sources} />
          </SlimAccordion>
        </Grid>
      </Grid>

    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({


  }))

export default NormalVisualization