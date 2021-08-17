import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import { useSelector, useDispatch } from 'react-redux'
import { loadRootCatalog } from '../Store/Actions/data'
import { getAllDatasets } from '../API/Api'

const TestCache: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const data = getAllDatasets()

  let dataSets: any[] = []

  if (data) {
    dataSets = data
  }

  console.log('Datasets in cache: ', dataSets)

  return (
    <div >
      {dataSets.map((dataset: any) => {
        return (
          <div style={{ margin: '20px' }}>{dataset.href}</div>
        )
      })}
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({

  }))

export default TestCache