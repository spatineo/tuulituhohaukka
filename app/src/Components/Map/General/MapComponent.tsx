import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dataset } from '../../../types'
import { RootState } from '../../../App'
import { createStyles, makeStyles } from '@material-ui/styles'
import { Grid, Button } from '@material-ui/core'
import SlimAccordion from './SlimAccordion'
import OpenLayersMap from './OpenLayersMap'
import { Map } from '../../../types'
import { removeMap } from '../../../Store/Actions/data'
import DatasetList from '../ListComponents/Lists/DatasetList'
import NormalVisualization from '../Visualization/NormalVisualization'
import { getAllDatasets, getItemsForDatasetAndTime } from '../../../API/Api'

interface Props {
  mapObject: Map,
  mapComponentIndex: number
  datasets: Dataset[]
}

const MapComponent: React.FC<Props> = ({ mapObject, mapComponentIndex, datasets }) => {
  const inspectionDate = useSelector((state: RootState): string => state.dataReducer.data.global.inspectionDate)
  const selectedDataset = useSelector((state: RootState) => state.dataReducer.data.maps[mapComponentIndex].selectedDataset)
  const editedDate = new Date(inspectionDate).toISOString().split("T")[0]
  const classes = useStyles()
  const dispatch = useDispatch()

  let itemObject: { items: any[] } = { items: [] }

  // UNCOMMENT THIS TO FETCH MAP ITEMS
  if (inspectionDate && selectedDataset) {
    itemObject = getItemsForDatasetAndTime(selectedDataset, inspectionDate) as { items: any[] }
  }

  const item = (itemObject && itemObject.items && itemObject.items.length) > 0 ? itemObject.items[0] : null;

  const datasetCatalog = getAllDatasets()?.find((c: any) => c.id === selectedDataset);

  let dateStr = '';
  if (item?.properties?.datetime) {
    dateStr = new Date(item?.properties?.datetime).toISOString().split("T")[0];
  } else if (item?.properties?.start_datetime) {
    dateStr = new Date(item?.properties?.start_datetime).toISOString().split("T")[0] + ' - ' + new Date(item?.properties?.end_datetime).toISOString().split("T")[0];
  } else if (!item) {
    dateStr = 'N/A'
  }

  return (
    <div className={classes.mapContainer}>
      <div className={classes.mapBox}>
        <Button
          style={{ position: 'absolute', zIndex: 2, maxWidth: '35px', minWidth: '35px', maxHeight: '35px', minHeight: '35px', right: '0px' }}
          variant="contained"
          color="secondary"
          onClick={() => dispatch(removeMap({ id: mapObject.id }))}
        >
          -
        </Button>
        <div
          style={{ position: 'absolute', zIndex: 2, left: '0px', bottom: '0px', padding: '0.5em', color: '#ffffffaa', pointerEvents: 'none', filter: 'drop-shadow(0px 0px 5px black)' }}
        >
          {dateStr}
        </div>
        <OpenLayersMap datasetCatalog={datasetCatalog} item={item} channelSettings={mapObject.channelSettings} />
      </div>
      <div className={classes.footer}>
        <Grid container>
          <Grid container item xs={12} justify='center' alignItems='center'>
            <div style={{ fontSize: '14px' }}>{datasetCatalog ? datasetCatalog.title : '-'}</div>
          </Grid>
        </Grid>
      </div>
      <div className={classes.menuContainer}>
        <div className={classes.dropDown}>
          <SlimAccordion name={'Aineistot'} isExpanded={false}>
            <DatasetList datasets={datasets} mapComponentIndex={mapComponentIndex} />
          </SlimAccordion>
        </div>
        <div className={classes.dropDown}>
          <SlimAccordion name={'Visualisointi'} isExpanded={false}>
            <NormalVisualization channelSettings={mapObject.channelSettings} mapComponentIndex={mapComponentIndex} />
          </SlimAccordion>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    mapContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      aspectRatio: '4/3',
    },
    mapBox: {
      display: 'flex',
      border: 'solid black 1px',
      height: '75%',
      width: '100%',
      position: 'relative',
    },
    footer: {
      display: 'flex',
      height: '15%',
      width: '100%',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      borderBottom: 'solid black 1px',
      borderLeft: 'solid black 1px',
      borderRight: 'solid black 1px'
    },
    menuContainer: {
      display: 'flex',
      height: '10%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dropDown: {
      width: '100%',
      height: '100%',
      zIndex: 10,
    },
  }))

export default MapComponent