import * as React from 'react'
import { useSelector } from 'react-redux'
import { FixedSizeList } from 'react-window'
import { ReduxState, Source } from '../../../types'
import { Grid, Input, InputAdornment } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import DataSourceListItem from './DataSourceListItem'

interface Props {
  sources: Source[]
}

const DataSourceList: React.FC<Props> = ({ sources }) => {

  console.log('Source from redux are: ', sources)
  const [selectedValue, setSelectedValue] = React.useState('')
  const [searchText, setSearchText] = React.useState('')

  const handleChange = (value: string) => {
    setSelectedValue(value)
  }

  const searchAndFilter = (input: string) => {
    const filteredSources = sources.filter((source: Source) => {
      const sourceData = source.name.toUpperCase()
      const searchText = input.toUpperCase()
      return sourceData.includes(searchText)
    }).sort()
    return filteredSources
  }

  const filteredSources = searchAndFilter(searchText)

  return (
    <div>
      <Grid container direction='column' spacing={2}>
        <Grid container item direction='row' xs={12} justify='center'>
          <Input
            style={{ paddingLeft: '5px', paddingRight: '5px', fontSize: '15px' }}
            placeholder='Search'
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            endAdornment={<InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>} />
        </Grid>
        <Grid container item direction='row'>
          <Grid item xs={12}>
            <FixedSizeList
              height={200}
              width={200}
              itemSize={30}
              itemCount={filteredSources.length}
              itemData={{ sources: filteredSources, selectedValue: selectedValue, onChange: handleChange }}>
              {DataSourceListItem}
            </FixedSizeList>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default DataSourceList