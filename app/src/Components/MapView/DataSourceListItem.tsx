import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import { Radio } from '@material-ui/core'

interface Props {
  selectedValue: string
  name: string
  onChange: (value: string) => void
}

const DataSourceListItem: React.FC<Props> = ({ selectedValue, name, onChange }) => {
  const classes = useStyles()
  return (
    <div className={classes.listItemContainer}>
      <Radio
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