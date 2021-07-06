import { takeLatest, call, put } from "@redux-saga/core/effects"
import { LOAD_DATA } from "../Actions/data"
import {setData} from '../Actions/data'

import jsonFile from '../../redux-state.json'

const getData = async() => {
  // return fetch('url').then(res => res.json())
  return jsonFile
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