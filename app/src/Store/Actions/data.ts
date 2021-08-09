import dataReducer from "../Reducers/data"

export const LOAD_DATA = 'LOAD_DATA'
export const SET_DATA = 'SET_DATA'
export const SET_RED_CHANNEL = 'SET_RED_CHANNEL'
export const SET_GREEN_CHANNEL = 'SET_GREEN_CHANNEL'
export const SET_BLUE_CHANNEL = 'SET_BLUE_CHANNEL'
export const SET_INSPECTION_DATE = 'SET_INSPECTION_DATE'
export const SET_COMPARISON_DATE = 'SET_COMPARISON_DATE'
export const SET_DATA_SOURCE = 'SET_DATA_SOURCE'
export const REMOVE_MAP = 'REMOVE_MAP'
export const ADD_MAP = 'ADD_MAP'

interface LoadDataAction {
  type: string
}
interface SetDataAction {
  type: string
  payload: JSON
}

interface SetColorChannelAction {
  type: string
  payload: any
}

export const loadData = (): LoadDataAction => ({
  type: LOAD_DATA
})

export const setData = (data: JSON): SetDataAction => ({
  type: SET_DATA,
  payload: data,
})

export const setRedChannel = (data: any): SetColorChannelAction => ({
  type: SET_RED_CHANNEL,
  payload: data
})

export const setGreenChannel = (data: any): SetColorChannelAction => ({
  type: SET_GREEN_CHANNEL,
  payload: data
})

export const setBlueChannel = (data: any): SetColorChannelAction => ({
  type: SET_BLUE_CHANNEL,
  payload: data
})

export const setInspectionDate = (data: any): SetDataAction => ({
  type: SET_INSPECTION_DATE,
  payload: data
})

export const setComparisonDate = (data: any): SetDataAction => ({
  type: SET_COMPARISON_DATE,
  payload: data
})

export const setDataSource = (data: any): SetDataAction => ({
  type: SET_DATA_SOURCE,
  payload: data
})

export const removeMap = (data: any): SetDataAction => ({
  type: REMOVE_MAP,
  payload: data
})

export const addMap = (data: any): SetDataAction => ({
  type: ADD_MAP,
  payload: data,
})
