import { takeLatest, put, call, select } from '@redux-saga/core/effects'
import axios from 'axios'
import { LOAD_ROOT_CATALOG } from '../Actions/data'
import { setRootCatalog, catalogFetchStart, catalogFetchFailed, catalogFetchFinished } from '../Actions/data'

interface LoadDataActionWithParam {
  type: string,
  payload: string
}

// ______ Saga watcher _____

// Once LOAD_ROOT_CATALOG action is detected, loadCatalogWorker is called
export function* loadCatalogWatcher2(): any {
  console.log('loadCatalogWatcher called!')
  yield takeLatest(LOAD_ROOT_CATALOG, loadCatalogWorker)
}

// Function will download the catalog if it is not found already from cahce
function* loadCatalogWorker(action: LoadDataActionWithParam): any {
  console.log('loadCatalogWorker called!')
  const rootCatalog = yield call(getAllDatasets, action.payload)
  yield put(setRootCatalog(rootCatalog))

}

// Function will get root catalog and filter the dataSets from it
const getAllDatasets = async (url: string) => {
  console.log('getAllDatasets called')
  const rootCatalog = await getCatalog(url)
  const dataSets = rootCatalog.links.filter((link: any) => link.rel === 'child')
  return dataSets
}

// Function will check if catalog is in cache, 
// if not it will be downloaded and put into cahce
const getCatalog = async (url: string) => {
  console.log('getCatalog called')
  const catalog = await select((state) => state.cache.catalog) as any
  if (catalog[url]) {
    console.log('catalog found! Returning catalog from cache')
    return catalog[url]
  }

  // Check if fetch is in progress for given URL
  const fetchInProgress = select((state) => state.cache.fetchInProgress[url])
  console.log('catalog: ', catalog[url])
  console.log('fetchInProgress: ', fetchInProgress)

  if (!catalog[url] && !fetchInProgress) {
    // ---> This may create an issue with concurrent data fetching
    console.log('Catalog not found from cache. Starting to download catalog')
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



