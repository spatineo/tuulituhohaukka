import { fork, all } from 'redux-saga/effects'
import { loadDummyDataWatcher } from './loadDummyDataSaga'

import { loadCatalogWatcher } from './loadCatalogSaga'

export function* rootSaga() {
  yield all(
    [
      fork(loadDummyDataWatcher),
      fork(loadCatalogWatcher)
    ]
  )
}