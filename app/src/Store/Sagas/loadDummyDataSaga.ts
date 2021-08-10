import axios from "axios"
import { takeLatest, call, put } from "@redux-saga/core/effects"
import { LOAD_DATA } from "../Actions/data"
import { setData } from '../Actions/data'

// import jsonFile from '../../../public/TestData/redux-state.json'
// import dummyData from '../../../public/TestData/dummy-data.json'

// _____ Dummy Data Functions _____
const getDummyData = async () => {
  const response = await axios.get('/TestData/dummy-data.json')
  return response.data
}

// This will look for LOAD_DATA and run side effects once it is dispatched 
export function* loadDummyDataWatcher(): any {
  console.log('loadDataWatcher called!')
  yield takeLatest(LOAD_DATA, loadDummyDataFlow)
}

function* loadDummyDataFlow(): any {
  console.log('LoadDataFlow called!')
  const data = yield call(getDummyData)
  yield put(setData(data))
}






