import * as React from 'react'
import { useSelector } from 'react-redux'

import SourceDataListItem from './DataSourceListItem'
import { RootState } from '../../App'

interface Source {
  id: string
  name: string
  channelSelectorType: string
}

const DataSourceList: React.FC = () => {
  const [selectedValue, setSelectedValue] = React.useState('')
  const sources = useSelector((state: RootState) => state.data.cache.sources)
  console.log('Source from redux are: ', sources)

  const handleChange = (value: string) => {
    setSelectedValue(value)
  }

  return (
    <div>
      {sources.map((source: Source) =>
        <SourceDataListItem
          key={source.id}
          selectedValue={selectedValue}
          name={source.name}
          onChange={handleChange}
        />)}
    </div>
  )
}

export default DataSourceList