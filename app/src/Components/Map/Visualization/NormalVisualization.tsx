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
  // Get State from Redux
  // const sources = useSelector((state: ReduxState): Array<Source> => state.data.cache.sources)


  const [clickedColorTile, setClickedColorTile] = React.useState('')
  const [redCircleValue, setRedCircleValue] = React.useState('')
  const [greenCircleValue, setGreenCircleValue] = React.useState('')
  const [blueCircleValue, setBlueCircleValue] = React.useState('')


  const classes = useStyles()

  const sources = [
    {
      name: 'VV'
    },
    {
      name: 'VH'
    }
  ]

  const setClicked = (value: string) => {
    setClickedColorTile(value)
  }

  const switchListColor = (clickedColorTile: string) => {
    switch (clickedColorTile) {
      case 'R': {
        return (
          <Grid item xs={10} >
            <SlimAccordion name={'list'}>
              <DataSourceList sources={sources} color={'R'} setColorValue={setRedCircleValue} />
            </SlimAccordion>
          </Grid>
        )
      }
      case 'G': {
        return (
          <Grid item xs={10} >
            <SlimAccordion name={'list'}>
              <DataSourceList sources={sources} color={'G'} setColorValue={setGreenCircleValue} />
            </SlimAccordion>
          </Grid>
        )
      }
      case 'B': {
        return (
          <Grid item xs={10} >
            <SlimAccordion name={'list'}>
              <DataSourceList sources={sources} color={'B'} setColorValue={setBlueCircleValue} />
            </SlimAccordion>
          </Grid>
        )
      }
      default: {
        return (
          <Grid item xs={10} >
            <SlimAccordion name={'list'}>

              <DataSourceList sources={sources} color={'R'} />
            </SlimAccordion>
          </Grid>
        )

      }
    }

  }


  return (
    <div style={{ width: '100%', paddingTop: '10px', paddingBottom: '10px' }}>
      <Grid container direction='column' spacing={2}>

        <Grid container item direction='row' justify='center'>
          <Grid item xs={3}>
            <ChannelColorTile text={redCircleValue} letter={'R'} color={'red'} setClicked={setClicked} />
          </Grid>
          <Grid item xs={3}>
            <ChannelColorTile text={greenCircleValue} letter={'G'} color={'rgb(70,198,25)'} setClicked={setClicked} />
          </Grid>
          <Grid item xs={3}>
            <ChannelColorTile text={blueCircleValue} letter={'B'} color={'rgb(0,143,225)'} setClicked={setClicked} />
          </Grid>
        </Grid>

        <Grid container item direction='row' justify='center' >
          {switchListColor(clickedColorTile)}
        </Grid>
      </Grid>

    </div >
  )
}

const useStyles = makeStyles(() =>
  createStyles({


  }))

export default NormalVisualization