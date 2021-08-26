import { fork, all } from 'redux-saga/effects'
import { loadInitialSetupWatcher } from './loadInitialSetupSaga'

import { loadCatalogWatcher } from './loadCatalogSaga'

export function* rootSaga(): any {
  yield all(
    [
      fork(loadInitialSetupWatcher),
      fork(loadCatalogWatcher)
    ]
  )
}