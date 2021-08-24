import axios from 'axios'
import { takeLatest, call, put } from "@redux-saga/core/effects"
import { LOAD_INITIAL_SETUP } from "../Actions/data"
import { setInitialSetup } from '../Actions/data'

const getInitialSetup = async () => {
  console.log('Fetching initial setup')
  const response = await axios.get('/TestData/initialSetup.json')
  return response.data
}

export function* loadInitialSetupWatcher(): any {
  console.log('loadDataWatcher called!')
  yield takeLatest(LOAD_INITIAL_SETUP, loadInitialSetupFlow)
}

function* loadInitialSetupFlow(): any {
  console.log('LoadDataFlow called!')
  const data = yield call(getInitialSetup)
  console.log('Dispatching initial setup..')
  yield put(setInitialSetup(data))
}