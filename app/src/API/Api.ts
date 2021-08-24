import { store } from '../App'
import { loadCatalog } from '../Store/Actions/data'

interface RootCatalog {
  type?: string,
  stack_version?: string,
  description?: string,
  links?: Array<any>
}

// Helper function
const getCatalogHelper = (url: string) => {
  console.log('Helper function called. Checking if catalog can be found for given url')
  const ReduxState = store.getState()
  const catalog = ReduxState.dataReducer.cache.catalog[url]
  if (!catalog) {
    console.log('No catalog found for given url from cache. Dispatching action to load more..')
    store.dispatch(loadCatalog({ url: url }))
    console.log('Returning empty object for now')
    return {}
  } else {
    console.log('catalog found! returning catalog')
    return catalog
  }
}

export const getAllDatasets = (): any[] | undefined => {
  console.log('getAllDatasets Called')
  // 1. get root catalog
  const ReduxState = store.getState()
  const rootCatalog: RootCatalog = ReduxState.dataReducer.cache.catalog['/Testdata/root.json']
  console.log('Getting rootCatalog from redux: ', rootCatalog)

  // Check if object is empty
  if (rootCatalog && Object.keys(rootCatalog).length === 0 || rootCatalog == undefined) {
    console.log('Root catalog not found. Dispatching action to download root catalog')
    store.dispatch(loadCatalog({ url: '/Testdata/root.json' }))
    return []
  }
  // 2. get all datasets catalog
  else {
    console.log('Root Catalog found! Starting to filter links ')
    console.log('Rootcatalog in api function: ', rootCatalog)
    if (rootCatalog.links) {
      // 3. read id and title from each dataset catalog and return as an array of objects {datasets: [{id: 'foo', title: 'bar'}, {...}]}
      const dataSets = rootCatalog.links.filter((link: any) => link.rel === 'child').map((link: any) => {
        console.log('Looping to get next level inside catalog 🔁 ')
        console.log('Current link to fetch is: ', link.href)
        const catalog = getCatalogHelper(link.href)
        return catalog
      }).filter((catalog) => catalog.id !== undefined)
      // Once loop is finished, return array of dataSets
      return dataSets
    }
  }
}

export const getBandsForDataset = (id: string) => {
  console.log('getBandsForDatasets called!')
  // 1. get all dataset catalogs
  const dataSets = getAllDatasets()
  console.log('Datasets returned: ', dataSets)
  // 2. find the dataset catalog with given id
  const dataSetById = dataSets?.find(dataset => dataset.id == id)
  console.log('Dataset with given id: ', dataSetById)
  // 3. return bands from selecte dataset catalog contents
  const bands = dataSetById.summaries.bands
  console.log('Bands to return: ', bands)
  return bands
}

export const getItemsForDatasetAndTime = (datasetId: string, inspectionTime: string) => {
  // 1. get root catalog
  // 2. get all dataset catalogs
  const dataSets = getAllDatasets()
  // 3. find the dataset catalog with given id
  const dataSetById = dataSets?.find(dataSet => dataSet.id == datasetId)
  // 4. identify dataset-time catalog that overlap with "inspectionTime" and the next dataset-time catalog (in time order)

  // 5. get dataset-time catalogs that were identified in step 4
  // 6. get all items in the two dataset-time catalogs identified in step 4
  // 7. place items from step 6 in order (per time) and select the first item where startdate (or time) is after inspectionTime 
  // 8. return data

  return { items: [ /* items */] };

  // If a catalog or item is not loaded yet, start loading it and do not proceed further, return an empty result: { items: [] }
}

