import * as React from 'react'
import { createStyles, makeStyles, withStyles } from '@material-ui/styles'
import { green } from '@material-ui/core/colors';
import { Radio, RadioProps } from '@material-ui/core'

interface Props {
  id: string
  name: string
  onChange: (value: string) => void
  selectedValue: string
}

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const DataSourceListItem: React.FC<Props> = ({ name, onChange, selectedValue }) => {
  const classes = useStyles()
  return (
    <div className={classes.listItemContainer}>
      <GreenRadio
        checked={selectedValue === name}
        onChange={() => onChange(name)}
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
      fontSize: '0.7rem',
    }
  }))

export default DataSourceListItem