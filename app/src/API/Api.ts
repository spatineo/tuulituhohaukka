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
}

// Helper function
const getCatalogHelper = (url: string) => {
  console.log('API: Helper function called. Checking if catalog can be found for given url')
  const ReduxState = store.getState()
  const catalog = ReduxState.dataReducer.cache.catalog[url]
  if (!catalog) {
    console.log('API: No catalog found for given url from cache. Dispatching action to load more..')
    store.dispatch(loadCatalog({ url: url }))
    return {}
  } else {
    console.log('API: catalog found! returning catalog')
    return catalog
  }
}
// 1. get root catalog
// 2. get all datasets catalog
// 3. read id and title from each dataset catalog and return as an array of objects {datasets: [{id: 'foo', title: 'bar'}, {...}]}
export const getAllDatasets = (): any | undefined => {
  console.log('API: getAllDatasets Called')
  const ReduxState = store.getState()
  const rootCatalog: RootCatalog = ReduxState.dataReducer.cache.catalog['https://s3.eu-west-1.amazonaws.com/directory.spatineo.com/tmp/tuulituhohaukka-stac/catalog/root.json']
  console.log('RootCatalog from server: ', rootCatalog)

  if (rootCatalog && Object.keys(rootCatalog).length === 0 || rootCatalog == undefined) {
    console.log('API: Root catalog not found. Dispatching action to download root catalog')
    store.dispatch(loadCatalog({ url: 'https://s3.eu-west-1.amazonaws.com/directory.spatineo.com/tmp/tuulituhohaukka-stac/catalog/root.json' }))
    return []
  }
  else {
    if (rootCatalog.links) {
      const datasets = rootCatalog.links.filter((link: Link) => link.rel === 'child')
        .map((link: Link) => {
          console.log('API: Looping to get next level inside catalog 🔁 ')
          console.log('API: Current link to fetch is: ', link.href)
          const catalog = getCatalogHelper(link.href)
          return catalog
        })
        .filter((catalog) => catalog.id !== undefined)
      console.log('Dataset returned from getAllDatasets: ', datasets)
      return datasets
    }
  }
}

// 1. get all dataset catalogs
// 2. find the dataset catalog with given id
// 3. return bands from selecte dataset catalog contents
export const getBandsForDataset = (id: string): any => {
  console.log('API: getBandsForDatasets called!')
  const dataSets = getAllDatasets()
  console.log('API: Datasets returned: ', dataSets)
  const dataSetById = dataSets?.find((dataset: Dataset) => dataset.id == id)
  console.log('API: Dataset with given id: ', dataSetById)
  const bands = dataSetById.summaries.bands
  console.log('API: Bands to return: ', bands)
  return bands
}

export const getItemsForDatasetAndTime = (datasetId: string, inspectionTime: string) => {
  // 1. get root catalog
  // 2. get all dataset catalogs
  const dataSets = getAllDatasets()
  // 3. find the dataset catalog with given id
  const dataSetById = dataSets?.find((dataSet: any) => dataSet.id == datasetId)
  // 4. identify dataset-time catalog that overlap with "inspectionTime" and the next dataset-time catalog (in time order)

  // 5. get dataset-time catalogs that were identified in step 4
  // 6. get all items in the two dataset-time catalogs identified in step 4
  // 7. place items from step 6 in order (per time) and select the first item where startdate (or time) is after inspectionTime 
  // 8. return data

  return { items: [ /* items */] };

  // If a catalog or item is not loaded yet, start loading it and do not proceed further, return an empty result: { items: [] }
}

