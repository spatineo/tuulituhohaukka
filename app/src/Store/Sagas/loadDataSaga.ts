import { takeLatest, call, put } from "@redux-saga/core/effects"
import { LOAD_DATA } from "../Actions/data"
import {setData} from '../Actions/data'

import jsonFile from '../../TestData/redux-state.json'
import dummyData from '../../TestData/dummy-data.json'

const getData = async() => {
  // return fetch('url').then(res => res.json())
  return dummyData
}

export function* loadDataWatcher(): any {
  console.log('loadDataWatcher called!')
  yield takeLatest(LOAD_DATA, loadDataFlow)
}

function* loadDataFlow(): any {
  console.log('LoadDataFlow called!')
  const data = yield call(getData)
  yield put(setData(data))
}