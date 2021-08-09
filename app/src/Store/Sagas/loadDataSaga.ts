import { takeLatest, call, put } from "@redux-saga/core/effects"
import { LOAD_DATA } from "../Actions/data"
import { setData } from '../Actions/data'

// import jsonFile from '../../../public/TestData/redux-state.json'
// import dummyData from '../../../public/TestData/dummy-data.json'
import axios from "axios"

const getData = async () => {
  const response = await axios.get('/TestData/dummy-data.json')
  return response.data
}

const fetchRootCatalogue = async () => {
  const response = await axios.get('/Testdata/root.json')
  return response.data
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