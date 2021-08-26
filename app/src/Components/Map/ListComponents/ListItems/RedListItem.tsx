import * as React from 'react'
import { useDispatch } from 'react-redux';
import { setRedChannel } from '../../../../Store/Actions/data'
import { createStyles, makeStyles, withStyles } from '@material-ui/styles'
import { red } from '@material-ui/core/colors';
import { Radio, RadioProps } from '@material-ui/core'
import { ListChildComponentProps } from 'react-window'
import { isNamedExports } from 'typescript';

const RedRadio = withStyles({
  root: {
    color: red[400],
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const RedListItem: React.FC<ListChildComponentProps> = ({ data, index, style }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const name = data.bands[index].name
  const selectedValue = data.selectedValue
  const mapComponentIndex = data.mapComponentIndex

  return (
    <div className={classes.listItemContainer} style={style}>
      <RedRadio
        checked={selectedValue === name}
        onChange={() => {
          dispatch(setRedChannel({ mapComponentIndex: mapComponentIndex, redChannelValue: name }))
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

export default RedListItem