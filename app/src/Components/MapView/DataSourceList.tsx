import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'

import SourceDataListItem from './DataSourceListItem'

// interface interfaceName {
//   value: string
// }

const DataSourceList: React.FC = () => {
  const [selectedValue, setSelectedValue] = React.useState('')
  const classes = useStyles()
  const sources = useSelector((state: any) => state.data.cache.sources)
  console.log('Source from redux are: ', sources)

  const handleChange = (value: string) => {
    setSelectedValue(value)
  }

  return (
    <div>
      {sources.map((source: any) =>
        <SourceDataListItem
          selectedValue={selectedValue}
          name={source.name}
          onChange={handleChange}
        />)}
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({

  }))

export default DataSourceList