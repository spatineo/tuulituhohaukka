import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import Circle from './Circle'

interface Props {
  text: string
  letter: string
  color: string
  setClicked: any
}

const ChannelColorTile: React.FC<Props> = ({ text, letter, color, setClicked }) => {
  const classes = useStyles()
  return (
    <div>
      <Grid container direction='column' justify='center' alignItems='center'>
        <Grid container item direction='row' xs={8} style={{ width: '100%', aspectRatio: '10/12' }}>
          <Grid container item xs={4} direction='column' justify='center' style={{ paddingTop: '10px' }} >
            {letter + ':'}
          </Grid>
          <Grid item xs={8} direction='column' justify='center' alignItems='center'>
            <div
              className={classes.ballContainer}
              onClick={() => setClicked(letter)}
            >
              <Circle text={text} color={color} borderWidth={'1'} />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div >
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    ballContainer: {
      display: 'flex',
      height: '100%',
      padding: '5px',
      aspectRatio: '1/1',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItem: 'center',
    },
  }))

export default ChannelColorTile