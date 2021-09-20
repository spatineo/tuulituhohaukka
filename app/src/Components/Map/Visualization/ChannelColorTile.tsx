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
    <Grid container>
      <Grid item xs={12}>
        <div
          className={classes.ballContainer}
          onClick={() => setClicked(letter)}
        >
          <Circle text={text} color={color} borderWidth={'1'} />
        </div>
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    ballContainer: {
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItem: 'center',
    },
  }))

export default ChannelColorTile