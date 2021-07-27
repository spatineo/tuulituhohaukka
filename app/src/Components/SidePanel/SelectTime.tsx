import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/styles'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import { createMuiTheme } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'
import { MuiThemeProvider } from '@material-ui/core'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { setInspectionDate } from '../../Store/Actions/data'

const SelectTime: React.FC = () => {
  const dateFromRedux = useSelector((state: any): string => state.dataReducer.data.global.selectedTime)
  const dateObject = new Date(dateFromRedux)
  const windDamages = [1, 6, 10, 24, 15]
  const today = new Date()

  const classes = useStyles()
  const dispatch = useDispatch()

  const customTheme = createMuiTheme({
    palette: {
      primary: {
        main: grey[200],
      }
    }
  })

  const handleDateChange = (date: Date | null) => {
    const payload = {
      selectedDate: date?.toISOString()
    }
    dispatch(setInspectionDate(payload))
  }

  const getDayElement = (day: any, selectedDate: any, isInCurrentMonth: any, dayComponent: any) => {
    //generate boolean 
    const isSunny = windDamages.includes(day.getDate());
    const isSelected = day.getDate() === selectedDate.getDate();
    const isToday = day.getDate() === today.getDate() && day.getMonth() === today.getMonth();

    let dateTile
    if (isInCurrentMonth) { //conditionally return appropriate Element of date tile.
      if (isSunny) {
        dateTile = (
          <Paper className={isSelected ? classes.selectedDayPaper : isToday ? classes.todayPaper : classes.normalDayPaper}>
            <Grid item><ErrorOutlineIcon style={{ color: "red", fontSize: 'medium' }} /></Grid>
            <Grid item justify='center' alignItems='center'>
              {day.getDate()}
            </Grid>
          </Paper>)
      } else {
        dateTile = (
          <Paper className={isSelected ? classes.selectedDayPaper : isToday ? classes.todayPaper : classes.normalDayPaper}>
            <Grid item><br /></Grid>
            <Grid item > {day.getDate()}</Grid>
          </Paper>)
      }
    } else {
      dateTile = (<Paper className={classes.notInThisMonthDayPaper}>
        <Grid item><br /></Grid>
        <Grid item style={{ color: "lightGrey" }}>
          {day.getDate()}
        </Grid>
      </Paper>)
    }
    return dateTile
  }

  return (
    <div >
      <MuiThemeProvider theme={customTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify='space-around'>
            <KeyboardDatePicker
              // disableToolbar
              variant='static'
              format='MM/dd/yyyy'
              margin='normal'
              id='date-picker'
              label='Date Picker'
              value={dateObject}
              onChange={handleDateChange}
              renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => getDayElement(day, selectedDate, isInCurrentMonth, dayComponent)}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    notInThisMonthDayPaper: {
      width: "35px",
      height: "35px",
      backgroundColor: "#eeeeee",
      margin: "3px",
      boxShadow: "none",
      borderRadius: 0,
      padding: "1px",
    },
    normalDayPaper: {
      width: "35px",
      height: "35px",
      backgroundColor: "#e8f5e9",
      margin: "3px",
      boxShadow: "none",
      borderRadius: 0,
      padding: "1px",
      cursor: "pointer",
    },
    selectedDayPaper: {
      width: "35px",
      height: "35px",
      backgroundColor: "white",
      margin: "3px",
      boxShadow: "none",
      borderRadius: 0,
      borderStyle: "solid",
      borderWidth: "3px",
      borderColor: "#ff0000",
      padding: "1px",
      cursor: "pointer",
    },
    todayPaper: {
      width: "35px",
      height: "35px",
      backgroundColor: "#4e9951",
      margin: "3px",
      boxShadow: "none",
      borderRadius: 0,
      padding: "1px",
      cursor: "pointer",
      color: " white",
    }
  })
)

export default SelectTime


