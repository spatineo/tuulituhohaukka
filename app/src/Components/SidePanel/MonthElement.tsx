import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createStyles, makeStyles } from '@material-ui/styles'
import { ButtonBase, Typography } from '@material-ui/core'
import { setInspectionDate } from '../../Store/Actions/data'

import { setComparisonDate } from '../../Store/Actions/data'

interface Props {
  month: string
  selectedType: string
  index: number
}

const MonthElement: React.FC<Props> = ({ month, selectedType, index }) => {
  const inspectionDateFromRedux = useSelector((state: any): string => state.dataReducer.data.global.inspectionDate)
  const comparisonDateFromRedux = useSelector((state: any): string => state.dataReducer.data.global.comparisonDate)
  const classes = useStyles()
  const dispatch = useDispatch()

  let date: Date
  let monthNumber: number


  if (selectedType === 'inspection') {
    date = new Date(inspectionDateFromRedux)
    monthNumber = date.getMonth()
  } else {
    date = new Date(comparisonDateFromRedux)
    monthNumber = date.getMonth()
  }

  const setMonth = (index: number) => {
    if (selectedType === 'inspection') {
      const editedDate = new Date(date.setMonth(index))
      const payload = {
        inspectionDate: editedDate
      }
      dispatch(setInspectionDate(payload))
    } else if (selectedType === 'comparison') {
      const payload = {
        comparisonDate: new Date()
      }

      if (comparisonDateFromRedux === '') {
        const date = new Date()
        const editedDate = new Date(date.setMonth(index))
        payload.comparisonDate = editedDate
      } else {
        const editedDate = new Date(date.setMonth(index))
        payload.comparisonDate = editedDate
      }

      dispatch(setComparisonDate(payload))
      console.log('edited date for blue: ', payload.comparisonDate)
      // send action to redux
    }
  }

  if (monthNumber === index && selectedType === 'inspection') {
    return (
      <div className={classes.redStyle}>
        <ButtonBase onClick={() => setMonth(index)}>
          <Typography style={{ fontSize: '12px' }}>{month}</Typography>
        </ButtonBase>
      </div>
    )
  } else if (monthNumber === index && selectedType === 'comparison') {
    return (
      <div className={classes.blueStyle}>
        <ButtonBase onClick={() => console.log('I was clicked!')} >
          <Typography style={{ fontSize: '12px' }}>{month}</Typography>
        </ButtonBase>
      </div>
    )
  } else {
    return (
      <div className={classes.noStyle}>
        <ButtonBase onClick={() => setMonth(index)} >
          <Typography style={{ fontSize: '12px' }}>{month}</Typography>
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