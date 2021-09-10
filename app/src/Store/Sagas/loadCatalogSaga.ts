import { takeLatest, put, call, select } from '@redux-saga/core/effects'
import axios from 'axios'
import { LOAD_CATALOG } from '../Actions/data'
import { catalogFetchStart, catalogFetchFailed, catalogFetchFinished } from '../Actions/data'

interface LoadDataActionWithParam {
  type: string,
  payload: Record<string, string>
}

// Once LOAD_ROOT_CATALOG action is detected, loadCatalogWorker is called
export function* loadCatalogWatcher(): any {
  console.log('Saga: loadCatalogWatcher called!')
  yield takeLatest(LOAD_CATALOG, getCatalog)
}

function* getCatalog(action: LoadDataActionWithParam): any {
  const url = action.payload.url
  const fetchInProgress = yield select((state) => state.dataReducer.dataFetching.fetchInProgress[url])
  console.log('Saga: Check if fetch is in progress')

  if (!fetchInProgress || fetchInProgress === false) {
    console.log('Saga: Fetch not in progress')
    console.log('Saga: Starting to download catalog in Saga for url: ', url)
    put(catalogFetchStart({ url, inProgress: true }))
    try {
      const response = yield axios.get(url)
      const fetchedCatalog = response.data
      console.log('Saga: Download finished in Saga! ✅  Sending action to update Redux: ', fetchedCatalog)
      yield put(catalogFetchFinished({ url, fetchedCatalog, inProgress: false }))
    } catch (error) {
      console.log('Saga: Error while downloading catalog! ⛔️ ', error)
      yield put(catalogFetchFailed({ url, error }))
    }
  }
}