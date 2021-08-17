import { fork, all } from 'redux-saga/effects'
import { loadDummyDataWatcher } from './loadDummyDataSaga'
import { loadCatalogWatcher } from './loadCatalogSaga'
import { loadCatalogWatcher2 } from './loadCatalogSaga2'
import { loadCatalogWatcherGenerator } from './loadCatalogSagaGenerator'

export function* rootSaga() {
  yield all(
    [
      fork(loadDummyDataWatcher),
      fork(loadCatalogWatcherGenerator)
    ]
  )
}