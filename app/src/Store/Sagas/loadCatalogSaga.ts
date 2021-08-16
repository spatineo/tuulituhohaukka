import axios from 'axios'
import { takeLatest, call, put, select } from 'typed-redux-saga'
import { LOAD_ROOT_CATALOG } from '../Actions/data'
import { setRootCatalog, catalogFetchStart, catalogFetchFailed, catalogFetchFinished } from '../Actions/data'


interface LoadDataActionWithParam {
  type: string,
  payload: string
}

// _____ Saga watchers and Workers ______

// Once LOAD_ROOT_CATALOG action is called, this saga will run
export function* loadCatalogWatcher(): any {
  console.log('loadCatalogWatcher called!')
  yield takeLatest(LOAD_ROOT_CATALOG, loadCatalogWorker)
}

function* loadCatalogWorker(action: LoadDataActionWithParam): any {
  console.log('loadCatalogWorker called!')
  const rootCatalog = yield call(getAllDatasets, action.payload)
  console.log('rootCatalog to be placed in Redux is: ', rootCatalog)
  yield put(setRootCatalog(rootCatalog))
}

// _____ Catalog functions
const getAllDatasets = async (url: string) => {
  console.log('getAllDatasets called!')
  console.log('parameter url: ', url)
  const rootCatalog = await getCatalog(url)
  // console.log('root catalog: ', rootCatalog)
  const dataSets = produceDatasetResults(rootCatalog)
  return dataSets
}

const getCatalog = async (url: string) => {
  const response = select((state: any) => state.cache.catalog) as any
  const catalog = response.payload
  console.log('catalog currently in redux: ', response)
  if (catalog[url]) {
    console.log('Catalog found! Returning current catalog')
    return catalog[url]
  }

  if (!catalog[url]) {
    console.log('Catalog not found! Starting to download catalog')
    put(catalogFetchStart({ url, inProgress: true }))
    try {
      const response = await axios.get(url)
      const fetchedCatalog = response.data
      console.log('Download finished! ✅ Updating Redux with new catalog')
      put(catalogFetchFinished({ url, fetchedCatalog, inProgress: false }))
    } catch (error) {
      console.log('Error while downloading catalog! ⛔️ ')
      put(catalogFetchFailed({ url, error }))
    }
  }
  return { links: [] }
}

export const produceDatasetResults = (rootCatalog: any) => {
  return { datasets: rootCatalog.links.filter((link: any) => link.rel === 'child') }
}


//______ Return catalog

export const fetchRootCatalog = async () => {
  const response = await axios.get('/Testdata/root.json')
  const rootCatalogue = response.data
  return rootCatalogue
}






// function* getCatalog(url: string) {
//   // Fetch catalog from Redux
//   console.log('getCatalog called!')
//   console.log('Checking if catalog can be found from Redux')
//   const getCurrentCatalog = (state: any) => state.cache.catalog
//   const catalog = select(getCurrentCatalog)
//   console.log('Catalog from Redux: ', catalog)

//   if (catalog[url]) return catalog

//   // If No catalog, fetch catalog, and initially return empty array
//   if (!catalog[url]) {
//     yield put(catalogFetchStart({ url, inProgress: true }))
//     yield axios.get(url).then(catalog => {
//       put(catalogFetchFinished({ url, catalog, inProgress: false }))
//     }).catch(error => {
//       put(catalogFetchFailed({ url, error }))
//     })
//   }
//   return { links: [] }
// }


