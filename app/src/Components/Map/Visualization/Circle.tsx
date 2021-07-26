import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'

interface Props {
  text: string
  color: string
  borderWidth: string
}

const Circle: React.FC<Props> = ({ text, color, borderWidth }) => {
  const classes = useStyles({ color, borderWidth })
  return (
    <div
      className={classes.circle}
      style={{ borderColor: `${color}`, borderWidth: `${borderWidth}` }}
    >

      {text}
    </div>
  )
}

const useStyles = makeStyles<Props>(() =>
  createStyles({
    circle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '80%',
      aspectRatio: '1/1',
      border: 'solid',
      borderRadius: '50%',
      background: 'rgb(247, 247, 247)',
      '&:hover': {
        background: 'rgb(230, 230, 230)',
        cursor: 'pointer'
      }
    },
  }))

export default Circle