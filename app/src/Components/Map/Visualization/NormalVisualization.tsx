import * as React from 'react'
import { useSelector } from 'react-redux'
import { createStyles, makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import ChannelColorTile from './ChannelColorTile'
import SlimAccordion from '../SlimAccordion'
import ColorSourceList from '../ListComponents/ColorSourceList'
import { ChannelSettings } from '../../../types'
import { getBandsForDataset } from '../../../API/Api'

interface Props {
  channelSettings: ChannelSettings
  mapComponentIndex: number
}

const NormalVisualization: React.FC<Props> = ({ channelSettings, mapComponentIndex }) => {
  const selectedSource = useSelector((state: any) => state.dataReducer.data.maps[mapComponentIndex].selectedSource)
  const classes = useStyles()
  const colorData = useSelector((state: any): ChannelSettings => state.dataReducer.data.maps[mapComponentIndex].channelSettings)
  const [clickedColorTile, setClickedColorTile] = React.useState('')

  const mapState = useSelector((state: any) => state.dataReducer.data.maps[mapComponentIndex])

  // React.useEffect(() => {
  //   getBandsForDataset(selectedSource)
  // }, [mapState])

  const sources = [
    {
      title: 'VV'
    },
    {
      title: 'VH'
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
              <ColorSourceList
                sources={sources}
                color={'red'}
                mapComponentIndex={mapComponentIndex} />
            </SlimAccordion>
          </Grid>
        )
      }
      case 'G': {
        return (
          <Grid item xs={10} >
            <SlimAccordion name={'list'}>
              <ColorSourceList
                sources={sources}
                color={'green'}
                mapComponentIndex={mapComponentIndex} />
            </SlimAccordion>
          </Grid>
        )
      }
      case 'B': {
        return (
          <Grid item xs={10} >
            <SlimAccordion name={'list'}>
              <ColorSourceList
                sources={sources}
                color={'blue'}
                mapComponentIndex={mapComponentIndex} />
            </SlimAccordion>
          </Grid>
        )
      }
      default: {
        return (
          <Grid item xs={10} >
            <SlimAccordion name={'list'}>
              <ColorSourceList
                sources={sources}
                color={'red'}
                mapComponentIndex={mapComponentIndex} />
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
            <ChannelColorTile text={colorData.R} letter={'R'} color={'red'} setClicked={setClicked} />
          </Grid>
          <Grid item xs={3}>
            <ChannelColorTile text={colorData.G} letter={'G'} color={'rgb(70,198,25)'} setClicked={setClicked} />
          </Grid>
          <Grid item xs={3}>
            <ChannelColorTile text={colorData.B} letter={'B'} color={'rgb(0,143,225)'} setClicked={setClicked} />
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