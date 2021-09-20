import * as React from 'react'
import { useDispatch } from 'react-redux';
import { setBlueChannel } from '../../../../Store/Actions/data'
import { createStyles, makeStyles, withStyles } from '@material-ui/styles'
import { blue } from '@material-ui/core/colors';
import { Radio, RadioProps } from '@material-ui/core'
import { ListChildComponentProps } from 'react-window'
import { isNamedExports } from 'typescript';

const BlueRadio = withStyles({
  root: {
    color: blue[400],
    '&$checked': {
      color: blue[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const BlueListItem: React.FC<ListChildComponentProps> = ({ data, index, style }) => {
  const name = data.bands[index].name
  const selectedValue = data.selectedValue
  const mapComponentIndex = data.mapComponentIndex
  const classes = useStyles()
  const dispatch = useDispatch()

  return (
    <div className={classes.listItemContainer} style={style}>
      <BlueRadio
        checked={selectedValue === name}
        onChange={() => {
          if (name === 'poista valinta') dispatch(setBlueChannel({ mapComponentIndex: mapComponentIndex, blueChannelValue: '' }))
          else dispatch(setBlueChannel({ mapComponentIndex: mapComponentIndex, blueChannelValue: name }))
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

export default BlueListItem