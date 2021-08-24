import * as React from 'react'
import { useDispatch, batch } from 'react-redux';

import { createStyles, makeStyles, withStyles } from '@material-ui/styles'
import { green } from '@material-ui/core/colors';
import { Radio, RadioProps } from '@material-ui/core'
import { ListChildComponentProps } from 'react-window'

import { setDataSource, setBands } from '../../../../Store/Actions/data'
import { getBandsForDataset } from '../../../../API/Api';

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const SourceListItem: React.FC<ListChildComponentProps> = ({ data, index, style }) => {
  const title = data.sources[index].title
  const selectedSource = data.selectedSource
  const sourceId = data.sources[index].id
  const mapComponentIndex = data.mapComponentIndex
  const classes = useStyles()
  const dispatch = useDispatch()



  console.log('Selected source in sourceList is:', selectedSource)

  return (
    <div className={classes.listItemContainer} style={style}>
      <GreenRadio
        checked={selectedSource === sourceId}
        onChange={() => {
          console.log('Sending action from component number: ', index)
          batch(() => {
            dispatch(setDataSource({ mapComponentIndex: mapComponentIndex, selectedSource: sourceId }))
            dispatch(setBands({ bands: getBandsForDataset(sourceId), mapComponentIndex: mapComponentIndex }))
          }
          )
        }}
        value={title}
      />
      {title}
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    listItemContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      fontSize: '0.6rem',
    }
  }))

export default SourceListItem