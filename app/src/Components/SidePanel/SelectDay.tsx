import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/styles'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import { MuiThemeProvider } from '@material-ui/core'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { setInspectionDate } from '../../Store/Actions/data'
import { RootState } from '../../App'
import locale from 'date-fns/locale/fi'
import format from 'date-fns/format'
import { customTheme } from '../../Theme/theme'

if (locale && locale.options) {
  locale.options.weekStartsOn = 1
}

const SelectDay: React.FC = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const inspectionDate = useSelector((state: RootState): string => state.dataReducer.data.global.inspectionDate)
  const inspectionDateObject = new Date(inspectionDate)
  const windDamages = [1, 6, 10, 24, 15]
  const today = new Date()

  const handleDateChange = (date: Date | null) => {
    dispatch(setInspectionDate({ inspectionDate: date?.toISOString() }))
  }

  const getDayElement = (day: any, selectedDate: any, isInCurrentMonth: any, dayComponent: any) => {
    const foundDamages = windDamages.includes(day.getDate());
    const isSelected = day.getDate() === selectedDate.getDate() && day.getMonth() === inspectionDateObject.getMonth();
    const isToday = day.getDate() === today.getDate() && day.getMonth() === today.getMonth() && day.getFullYear() === today.getFullYear();

    let dateTile
    if (isInCurrentMonth) { //conditionally return appropriate Element of date tile.
      if (foundDamages) {
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

  class LocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date: any) {
      return format(date, "EEEEEE d. MMMM", { locale: this.locale });
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <MuiThemeProvider theme={customTheme}>
        <MuiPickersUtilsProvider utils={LocalizedUtils} locale={locale}>
          <Grid container justify='space-around'>
            <DatePicker
              variant='static'
              margin='normal'
              id='date-picker'
              label='Date Picker'
              value={inspectionDateObject}
              views={["year", "month", "date"]}
              onChange={handleDateChange}
              renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => getDayElement(day, selectedDate, isInCurrentMonth, dayComponent)}
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
      width: "33px",
      height: "33px",
      padding: "1px",
      backgroundColor: "#eeeeee",
      boxShadow: "none",
      borderRadius: 0,
      borderStyle: "solid",
      borderWidth: "3px",
      borderColor: "white",
    },
    normalDayPaper: {
      width: "33px",
      height: "33px",
      padding: "1px",
      backgroundColor: "#e8f5e9",
      boxShadow: "none",
      borderRadius: 0,
      borderStyle: "solid",
      borderWidth: "3px",
      borderColor: "white",
      cursor: "pointer",
    },
    selectedDayPaper: {
      width: "33px",
      height: "33px",
      padding: "1px",
      backgroundColor: "white",
      boxShadow: "none",
      borderRadius: 0,
      borderStyle: "solid",
      borderWidth: "3px",
      borderColor: "red",
      cursor: "pointer",
    },
    todayPaper: {
      width: "33px",
      height: "33px",
      padding: "1px",
      backgroundColor: "#4e9951",
      boxShadow: "none",
      borderRadius: 0,
      borderStyle: "solid",
      borderWidth: "3px",
      borderColor: "white",
      cursor: "pointer",
      color: " white",
    }
  })
)

export default SelectDay


