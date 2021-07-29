import * as React from 'react'
import { useDispatch } from 'react-redux';

import { createStyles, makeStyles, withStyles } from '@material-ui/styles'
import { green } from '@material-ui/core/colors';
import { Radio, RadioProps } from '@material-ui/core'
import { ListChildComponentProps } from 'react-window'
import { setDataSource } from '../../../../Store/Actions/data'

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const DefaultListItem: React.FC<ListChildComponentProps> = ({ data, index, style }) => {
  const name = data.sources[index].name
  const selectedSource = data.selectedSource
  const mapComponentIndex = data.mapComponentIndex
  const classes = useStyles()
  const dispatch = useDispatch()

  console.log('name in DefaultListItem: ', DefaultListItem)
  console.log('selectedValue in DefaultListItem ', selectedSource)

  const payload = {
    mapComponentIndex: mapComponentIndex,
    selectedSource: name
  }

  return (
    <div className={classes.listItemContainer} style={style}>
      <GreenRadio
        checked={selectedSource === name}
        onChange={() => {
          dispatch(setDataSource(payload))
        }}
        value={name}
      />
      {name}
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

export default DefaultListItem