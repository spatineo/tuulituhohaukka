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
        <Grid container item direction='row' xs={8}>
          <Grid item xs={5}>
            <div className={classes.letterContainer}>{letter}: </div>
          </Grid>
          <Grid item xs={7}>
            <div
              className={classes.ballContainer}
              onClick={() => setClicked(letter)}
            >
              <Circle text={text} color={color} borderWidth={'1'} />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    letterContainer: {
      display: 'flex',
      height: '45px',
      flexDirection: 'column',
      justifyContent: 'center ',
      alignItem: 'center',
    },
    ballContainer: {
      display: 'flex',
      height: '45px',
      paddingLeft: '5px',
      aspectRatio: '1/1',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItem: 'center',
    },
  }))

export default ChannelColorTile