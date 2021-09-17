import { store } from '../App'
import { loadCatalog } from '../Store/Actions/data'
import { Dataset } from '../types'

interface RootCatalog {
  type?: string,
  stack_version?: string,
  description?: string,
  links?: []
}

interface Link {
  rel: string
  href: string
  time?: Time
}

interface Time {
  time_start: string
  time_end: string
}

interface CreatedLinkObject {
  time_start: Date
  time_end: Date
}

//const debug = console.log;
const debug = function (...args: any[]) { /* NOP */ }


const CATALOG_ROOT = 'https://s3.eu-west-1.amazonaws.com/directory.spatineo.com/tmp/tuulituhohaukka-stac/catalog/root2.json'

// Helper function
const getCatalogHelper = (url: string) => {
  debug('API: Helper function called. Checking if catalog can be found for given url')
  const ReduxState = store.getState()
  const catalog = ReduxState.dataReducer.cache.catalog[url]
  if (!catalog) {
    debug('API: No catalog found for given url from cache. Dispatching action to load more..')
    store.dispatch(loadCatalog({ url: url }))
    return {}
  } else {
    debug('API: catalog found! returning catalog')
    return catalog
  }
}
// 1. get root catalog
// 2. get all datasets catalog
// 3. read id and title from each dataset catalog and return as an array of objects {datasets: [{id: 'foo', title: 'bar'}, {...}]}
export const getAllDatasets = (): any | undefined => {
  debug('API: getAllDatasets Called')
  const ReduxState = store.getState()
  const rootCatalog: RootCatalog = ReduxState.dataReducer.cache.catalog[CATALOG_ROOT]
  debug('RootCatalog from server: ', rootCatalog)

  if (rootCatalog && Object.keys(rootCatalog).length === 0 || rootCatalog == undefined) {
    debug('API: Root catalog not found. Dispatching action to download root catalog')
    store.dispatch(loadCatalog({ url: CATALOG_ROOT }))
    return []
  }
  else {
    if (rootCatalog.links) {
      const datasets = rootCatalog.links.filter((link: Link) => link.rel === 'child')
        .map((link: Link) => {
          debug('API: Looping to get next level inside catalog 🔁 ')
          debug('API: Current link to fetch is: ', link.href)
          const catalog = getCatalogHelper(link.href)
          return catalog
        })
        .filter((catalog) => catalog.id !== undefined)
      debug('Dataset returned from getAllDatasets: ', datasets)
      return datasets
    }
  }
}

// 1. get all dataset catalogs
// 2. find the dataset catalog with given id
// 3. return bands from selecte dataset catalog contents
export const getBandsForDataset = (id: string): any => {
  debug('API: getBandsForDatasets called!')
  const dataSets = getAllDatasets()
  debug('API: Datasets returned: ', dataSets)
  const dataSetById = dataSets?.find((dataset: Dataset) => dataset.id == id)
  if (dataSetById) {
    debug('API: Dataset with given id: ', dataSetById)
    const bands = dataSetById.summaries.bands
    debug('API: Bands to return: ', bands)
    return bands
  }
}


// 1. get root catalog
// 2. get all dataset catalogs
// 3. find the dataset catalog with given id
// 4. identify dataset-time catalog that overlap with "inspectionTime" and the next dataset-time catalog (in time order)
// 5. get dataset-time catalogs that were identified in step 4
// 6. get all items in the two dataset-time catalogs identified in step 4
// 7. place items from step 6 in order (per time) and select the first item where startdate (or time) is after inspectionTime 
// 8. return data

export const getItemsForDatasetAndTime = (datasetId: string, inspectionTime: string) => {
  debug('API: getItemsForDatasetAndTime called!')

  const createLinkObject = (link: Link) => {
    return {
      href: link.href,
      time_start: link.time ? new Date(link.time.time_start) : null,
      time_end: link.time ? new Date(link.time.time_end) : null
    }
  }

  const sortObjectByTime = (a: CreatedLinkObject, b: CreatedLinkObject) => a.time_start.getTime() - b.time_start.getTime()
  const dataSets = getAllDatasets()
  const dataSetById = dataSets?.find((dataSet: any) => dataSet.id == datasetId)
  const inspectionDate = new Date(inspectionTime)
  const listOfSubCatalogs = dataSetById?.links.filter((link: Link) => link.rel === 'child').map(createLinkObject)
  if (!listOfSubCatalogs) {
    return { items: [ /* items */] }
  }

  // sort list in timely order
  listOfSubCatalogs.sort(sortObjectByTime)
  debug('API: ListOfSubCatalogs: ', listOfSubCatalogs)

  let index = listOfSubCatalogs.findIndex((object: any) => inspectionDate.getTime() < object.time_end.getTime())
  debug('API: found following: ', index)

  if (index === -1) {
    debug('There are no catalogs after inspection time')
  } else {

    // Loop untill wanted item is found
    for (; index < listOfSubCatalogs.length; index++) {
      const href = listOfSubCatalogs[index].href
      const datasetTimeCatalog = getCatalogHelper(href) as any

      if (!datasetTimeCatalog.links) {
        return { items: [ /* items */] }
      }

      const items = datasetTimeCatalog.links.filter((link: Link) => link.rel === 'item').map(createLinkObject)
      items.sort(sortObjectByTime)
      debug('API: Sorted items ', items)

      // Find item that starts after inspection time
      const foundItem = items.find((item: any) => inspectionDate.getTime() < item.time_start.getTime())
      if (foundItem) {
        debug('API: Item found! Starting to fetch next level in catalog..')
        const fetchedItem = getCatalogHelper(foundItem.href)

        if (!fetchedItem.links) {
          debug('API: Item not yet downloaded')
          return { items: [ /* items */] }
        } else {
          debug('API: found the item ✅', fetchedItem)
          return { items: [fetchedItem] }
        }
      }
      debug('API: Item not found, loop will run again 🔁')
    }
    return { items: [ /* items */] }
  }
  return { items: [ /* items */] }
}

