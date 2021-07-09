import { fork } from 'redux-saga/effects'
import { loadDataWatcher } from './loadDataSaga'

export function* rootSaga() {
  yield fork(loadDataWatcher)
}