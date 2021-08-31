import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createStyles, makeStyles } from '@material-ui/styles'
import { ButtonBase, Typography } from '@material-ui/core'
import { setSelectedMonth } from '../../Store/Actions/data'
import { RootState } from '../../App'

interface Props {
  month: string
  selectedType: string
  index: number
}

const MonthElement: React.FC<Props> = ({ month, selectedType, index }) => {
  const selectedMonth = useSelector((state: RootState) => state.dataReducer.data.global.selectedMonth)
  const classes = useStyles()
  const dispatch = useDispatch()

  let date: Date
  let monthNumber: number

  if (selectedType === 'inspection') {
    date = new Date(selectedMonth)
    monthNumber = date.getMonth()
  } else {
    date = new Date(selectedMonth)
    monthNumber = date.getMonth()
  }

  const setMonth = (index: number) => {
    if (selectedType === 'inspection') {
      const editedDate = new Date(date.setMonth(index))
      dispatch(setSelectedMonth({ selectedMonth: editedDate }))
    } else if (selectedType === 'comparison') {
      if (selectedMonth === '') {
        const date = new Date()
        const editedDate = new Date(date.setMonth(index))
        dispatch(setSelectedMonth({ selectedMonth: editedDate }))
      } else {
        const editedDate = new Date(date.setMonth(index))
        dispatch(setSelectedMonth({ selectedMonth: editedDate }))
      }
    }
  }

  if (monthNumber === index && selectedType === 'inspection') {
    return (
      <div className={classes.redStyle}>
        <ButtonBase onClick={() => setMonth(index)}>
          <Typography style={{ fontSize: '11px' }}>{month}</Typography>
        </ButtonBase>
      </div>
    )
  } else if (monthNumber === index && selectedType === 'comparison') {
    return (
      <div className={classes.blueStyle}>
        <ButtonBase onClick={() => console.log('I was clicked!')} >
          <Typography style={{ fontSize: '11px' }}>{month}</Typography>
        </ButtonBase>
      </div>
    )
  } else {
    return (
      <div className={classes.noStyle}>
        <ButtonBase onClick={() => setMonth(index)} >
          <Typography style={{ fontSize: '11px' }}>{month}</Typography>
        </ButtonBase>
      </div>
    )
  }
}

const useStyles = makeStyles(() =>
  createStyles({
    noStyle: {
    },
    redStyle: {
      textAlign: 'center',
      width: '100%',
      border: 'solid 1px',
      borderColor: '#ff0000',
      borderRadius: '5px',
      backgroundColor: '#ffc2c4'
    },
    blueStyle: {
      border: 'solid 1px',
      borderColor: '#009cff',
      borderRadius: '5px',
      backgroundColor: '#c1ebff'
    }
  }))

export default MonthElement