import dataReducer from "../Reducers/data"

export const LOAD_CATALOG = 'LOAD_ROOT_CATALOG'
export const SET_ROOT_CATALOG = 'SET_ROOT_CATALOG'
export const CATALOG_FETCH_START = 'CATALOG_FETCH_START'
export const CATALOG_FETCH_FINISHED = 'CATALOG_FETCH_FINISHED'
export const CATALOG_FETCH_FAILED = 'CATALOG_FETCH_FAILED'

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
export const UPDATE_MAP_EXTENT = 'UPDATE_MAP_EXTENT'


interface LoadDataAction {
  type: string
}

interface LoadDataActionWithParam {
  type: string,
  payload: string
}

interface SetDataAction {
  type: string
  payload: JSON
}

interface SetColorChannelAction {
  type: string
  payload: any
}

// _____ Catalog
export const loadCatalog = (data: any): LoadDataActionWithParam => ({
  type: LOAD_CATALOG,
  payload: data
})

export const setRootCatalog = (data: JSON): SetDataAction => ({
  type: SET_ROOT_CATALOG,
  payload: data
})

export const catalogFetchStart = (data: any): SetDataAction => ({
  type: CATALOG_FETCH_START,
  payload: data
})

export const catalogFetchFinished = (data: any): SetDataAction => ({
  type: CATALOG_FETCH_FINISHED,
  payload: data
})

export const catalogFetchFailed = (data: any): SetDataAction => ({
  type: CATALOG_FETCH_FAILED,
  payload: data
})




//_____ Dummy Data
export const loadData = (): LoadDataAction => ({
  type: LOAD_DATA
})

export const setData = (data: JSON): SetDataAction => ({
  type: SET_DATA,
  payload: data,
})


//_____ Functionality ______
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

export const updateMapExtent = (data: any): SetDataAction => ({
  type: UPDATE_MAP_EXTENT,
  payload: data
})
