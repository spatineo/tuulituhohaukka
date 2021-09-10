import { takeLatest, put, call, select } from '@redux-saga/core/effects'
import { LOAD_CATALOG } from '../Actions/data'
import { catalogFetchFinished } from '../Actions/data'

interface LoadDataActionWithParam {
  type: string,
  payload: Record<string, string>
}

// Once LOAD_ROOT_CATALOG action is detected, loadCatalogWorker is called
export function* loadCatalogWatcher(): any {
  console.log('Saga: loadCatalogWatcher called!')
  yield takeLatest(LOAD_CATALOG, getCatalog)
}

const PROGRESS : Record<string, Promise<Response> | undefined> = {}

async function getWithFetch(url : string) {
  let promise = PROGRESS[url];
  if (promise === undefined) {
    promise = fetch(url, { method: 'GET' }).then(r => r.json())
    PROGRESS[url] = promise;
  }

  return await promise;
}

function* getCatalog(action: LoadDataActionWithParam): any {
  const url = action.payload.url
  const fetchedCatalog = yield call(getWithFetch, action.payload.url)
  yield put(catalogFetchFinished({ url, fetchedCatalog, inProgress: false }))
}
