import * as React from 'react'
import { Typography, Card, Grid, Button } from '@material-ui/core'
import { Bar } from 'react-chartjs-2'
import MonthElement from './MonthElement'

const SelectMonth: React.FC = () => {
  const [chartData, setChartData] = React.useState({})
  const [selectedType, setSelectedType] = React.useState('inspection')
  const months = ['Tam', 'Hel', 'Maal', 'Huht', 'Touk', 'Kesä', 'Hei', 'Elo', 'Syys', 'Loka', 'Mar', 'Jou']

  const chart = () => {
    setChartData({
      labels: ['', '', '', '', '', '', '', '', '', '', '', ''],
      datasets: [
        {
          label: 'Wind Damages',
          data: [1, 3, 3, 2, 10, 4, 5, 10, 1, 2, 1, 1],
          backgroundColor: [
            'red'
          ],
          borderWidth: 1,
          barThickness: 8
        }
      ]
    })
  }

  const chartOptions = {
    animation: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          display: false
        },
        grid: {
          display: false
        }
      },
      y: {
        display: false,
        grid: {
          display: false,
        }
      }
    }
  }

  React.useEffect(() => {
    chart()
  }, [])

  return (
    <>
      <Card >
        <Bar
          data={chartData}
          options={chartOptions}
        />
        <Grid container spacing={1} justify='center'>
          {months.map((month, index) => (
            <Grid item xs={1} key={month} >
              <MonthElement index={index} month={month} selectedType={selectedType} />
            </Grid>
          ))}
          {/*
          <Grid container item justify='space-around'>
            <Grid item xs={6}>
              <Button
                style={{ color: '#00a9f7' }}
                onClick={() => setSelectedType('comparison')}
              >
                <Typography>Set comparison</Typography>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                color='secondary'
                onClick={() => setSelectedType('inspection')}
              >
                <Typography>Set inspection</Typography>
              </Button>
            </Grid>
          </Grid>
          */}
        </Grid>
      </Card>
    </>
  )
}

export default SelectMonth