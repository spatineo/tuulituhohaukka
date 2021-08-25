import * as React from 'react'
import { useSelector } from 'react-redux'
import { FixedSizeList } from 'react-window'
import { Source } from '../../../../types'
import { Grid, Input, InputAdornment } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import DatasetListItem from '../ListItems/DatasetListItem'

interface Props {
  sources: Source[],
  mapComponentIndex: number
}

const DatasetList: React.FC<Props> = ({ sources, mapComponentIndex }) => {
  const selectedDataset = useSelector((state: any): string => state.dataReducer.data.maps[mapComponentIndex].selectedDataset)
  const [searchText, setSearchText] = React.useState('')

  const searchAndFilter = (input: string) => {
    const filteredSources = sources.filter((source: Source) => {
      const sourceData = source.title.toUpperCase()
      const searchText = input.toUpperCase()
      return sourceData.includes(searchText)
    }).sort()
    return filteredSources
  }

  const filteredSources = searchAndFilter(searchText)

  return (
    <div style={{ width: '100%' }}>
      <Grid container direction='column' spacing={2}>
        <Grid container item direction='row' xs={12} justify='center'>
          <Input
            style={{ paddingLeft: '5px', paddingRight: '5px', fontSize: '15px' }}
            placeholder='Search'
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
              itemData={{
                sources: filteredSources,
                mapComponentIndex: mapComponentIndex,
                selectedDataset: selectedDataset
              }}>
              {DatasetListItem}
            </FixedSizeList>
          </Grid>
        </Grid>
      </Grid>
    </div >
  )
}

export default DatasetList