import * as React from 'react'
import { useDispatch } from 'react-redux';
import { setGreenChannel } from '../../../../Store/Actions/data'

import { createStyles, makeStyles, withStyles } from '@material-ui/styles'
import { green } from '@material-ui/core/colors';
import { Radio, RadioProps } from '@material-ui/core'
import { ListChildComponentProps } from 'react-window'
import { isNamedExports } from 'typescript';

// interface Props {
//   key: string
//   name: string
//   onChange: (value: string) => void
//   selectedValue: string
// }

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const GreenListItem: React.FC<ListChildComponentProps> = ({ data, index, style }) => {
  const name = data.sources[index].name
  const selectedValue = data.selectedValue
  const mapComponentIndex = data.mapComponentIndex
  const classes = useStyles()
  const dispatch = useDispatch()

  const payload = {
    mapComponentIndex: mapComponentIndex,
    greenChannelValue: name
  }

  return (
    <div className={classes.listItemContainer} style={style}>
      <GreenRadio
        checked={selectedValue === name}
        onChange={() => {
          dispatch(setGreenChannel(payload))
        }}
        value={isNamedExports}
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

export default GreenListItem