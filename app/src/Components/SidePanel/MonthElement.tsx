import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createStyles, makeStyles } from '@material-ui/styles'
import { ButtonBase, Typography } from '@material-ui/core'
import { setInspectionDate } from '../../Store/Actions/data'

interface Props {
  month: string
  selectedType: string
  index: number
}

const MonthElement: React.FC<Props> = ({ month, selectedType, index }) => {
  const dateFromRedux = useSelector((state: any): string => state.dataReducer.data.global.inspectionDate)
  const date = new Date(dateFromRedux)

  console.log('Date inside Month Element: ', date)

  const monthNumber = date.getMonth()
  const classes = useStyles()
  const dispatch = useDispatch()

  const setMonth = (index: number) => {
    if (selectedType === 'inspection') {
      // send action to redux
      const editedDate = new Date(date.setMonth(index))
      console.log('edited date is: ', editedDate)

      const payload = {
        inspectionDate: editedDate
      }

      dispatch(setInspectionDate(payload))
    } else if (selectedType === 'comparison') {
      console.log('This should dispatch action to set the blue color')
      // send action to redux
    }
  }

  if (monthNumber === index) {
    return (
      <div className={classes.redStyle}>
        <ButtonBase onClick={() => setMonth(index)}>
          <Typography style={{ fontSize: '12px' }}>{month}</Typography>
        </ButtonBase>
      </div>
    )
  } else if (selectedType === 'comparison') {
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