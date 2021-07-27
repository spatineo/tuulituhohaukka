import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import { Card, Grid } from '@material-ui/core'
import { Bar } from 'react-chartjs-2'

// interface interfaceName {
//   value: string
// }

const SelectMonth: React.FC = () => {
  const [chartData, setChartData] = React.useState({})
  const classes = useStyles()

  const chart = () => {
    setChartData({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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

  React.useEffect(() => {
    chart()
  }, [])

  return (
    <Card style={{ width: '370px', padding: '10px' }}>
      <Bar
        data={chartData}
        options={
          {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
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
          }}
      />
    </Card>
  )
}

const useStyles = makeStyles(() =>
  createStyles({

  }))

export default SelectMonth