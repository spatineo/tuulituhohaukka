import axios from 'axios'
import { takeLatest, call, put } from "@redux-saga/core/effects"
import { LOAD_DATA } from "../Actions/data"
import { setData } from '../Actions/data'

const getDummyData = async () => {
  const response = await axios.get('/TestData/dummy-data.json')
  return response.data
}

export function* loadDummyDataWatcher(): any {
  console.log('loadDataWatcher called!')
  yield takeLatest(LOAD_DATA, loadDummyDataFlow)
}

function* loadDummyDataFlow(): any {
  console.log('LoadDataFlow called!')
  const data = yield call(getDummyData)
  yield put(setData(data))
}