import axios from 'axios'
import { takeLatest, call, put } from "@redux-saga/core/effects"
import { LOAD_INITIAL_SETUP } from "../Actions/data"
import { setInitialSetup } from '../Actions/data'

const getInitialSetup = async () => {
  const response = await axios.get('/TestData/initialSetup.json')
  return response.data
}

export function* loadInitialSetupWatcher(): any {
  yield takeLatest(LOAD_INITIAL_SETUP, loadInitialSetupFlow)
}

function* loadInitialSetupFlow(): any {
  const data = yield call(getInitialSetup)
  yield put(setInitialSetup(data))
}