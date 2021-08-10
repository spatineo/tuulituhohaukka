import { fork } from 'redux-saga/effects'
import { loadDummyDataWatcher } from './loadDummyDataSaga'
import { loadCatalogWatcher } from './loadCatalogSaga'

export function* rootSaga() {
  yield fork(loadDummyDataWatcher)
  yield fork(loadCatalogWatcher)
}