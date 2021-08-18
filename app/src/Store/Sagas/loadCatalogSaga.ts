import { takeLatest, put, call, select } from '@redux-saga/core/effects'
import axios from 'axios'
import { LOAD_ROOT_CATALOG } from '../Actions/data'
import { catalogFetchStart, catalogFetchFailed, catalogFetchFinished } from '../Actions/data'

interface LoadDataActionWithParam {
  type: string,
  payload: string
}

// Once LOAD_ROOT_CATALOG action is detected, loadCatalogWorker is called
export function* loadCatalogWatcher(): any {
  console.log('loadCatalogWatcher called!')
  yield takeLatest(LOAD_ROOT_CATALOG, loadCatalogWorker)
}

// Function will download the catalog if it is not found already from cache
function* loadCatalogWorker(action: LoadDataActionWithParam): any {
  console.log('loadCatalogWorker called!')
  yield call(getCatalog, action.payload)
}

// Function will check if catalog is in cache, if not it will be downloaded and put into cache
function* getCatalog(url: string): any {
  console.log('getCatalog called')
  const catalog = yield select((state) => state.dataReducer.cache && state.dataReducer.cache.catalog)
  console.log('Catalog returned from redux: ', catalog)
  if (catalog[url]) {
    console.log('catalog found! Returning catalog from cache')
    return catalog[url]
  }

  // Check if fetch is in progress for given URL
  const fetchInProgress = yield select((state) => state.dataReducer.cache.fetchInProgress[url])

  if (!catalog[url] && !fetchInProgress) {
    // ---> This may create an issue with concurrent data fetching
    console.log('Catalog not found from cache. Starting to download catalog')
    put(catalogFetchStart({ url, inProgress: true }))
    try {
      const response = yield axios.get(url)
      const fetchedCatalog = response.data
      console.log('Download finished! ✅ Updating Redux with new catalog: ', fetchedCatalog)
      yield put(catalogFetchFinished({ url, fetchedCatalog, inProgress: false }))
    } catch (error) {
      console.log('Error while downloading catalog! ⛔️ ')
      yield put(catalogFetchFailed({ url, error }))
    }
  }
}