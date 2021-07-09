import * as React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'

// interface SelectMonthProps {

// }

const SelectMonth: React.FC = () => {
  const classes = useStyles()
  return (
    <div >
      This is a Select month component
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    SelectMonth: {

    },
  })
)

export default SelectMonth


