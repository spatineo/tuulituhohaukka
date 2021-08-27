export const LOAD_CATALOG = 'LOAD_ROOT_CATALOG'
export const SET_ROOT_CATALOG = 'SET_ROOT_CATALOG'
export const CATALOG_FETCH_START = 'CATALOG_FETCH_START'
export const CATALOG_FETCH_FINISHED = 'CATALOG_FETCH_FINISHED'
export const CATALOG_FETCH_FAILED = 'CATALOG_FETCH_FAILED'

export const LOAD_INITIAL_SETUP = 'LOAD_INITIAL_SETUP'
export const SET_INITIAL_SETUP = 'SET_INITIAL_SETUP'
export const SET_STATE_FROM_URL = 'SET_STATE_FROM_URL'

export const SET_ALL_DATASETS = 'SET_ALL_DATASETS'
export const SET_BANDS = 'SET_BANDS'

export const SET_RED_CHANNEL = 'SET_RED_CHANNEL'
export const SET_GREEN_CHANNEL = 'SET_GREEN_CHANNEL'
export const SET_BLUE_CHANNEL = 'SET_BLUE_CHANNEL'
export const SET_INSPECTION_DATE = 'SET_INSPECTION_DATE'
export const SET_COMPARISON_DATE = 'SET_COMPARISON_DATE'
export const SET_SELECTED_DATASET = 'SET_SELECTED_DATASET'
export const REMOVE_MAP = 'REMOVE_MAP'
export const ADD_MAP = 'ADD_MAP'
export const UPDATE_MAP_EXTENT = 'UPDATE_MAP_EXTENT'

interface LoadDataAction {
  type: string
}

interface SetDataAction {
  type: string
  payload: Record<string, unknown>
}

// _____ Catalog & Data
export const loadCatalog = (data: Record<string, unknown>): SetDataAction => ({
  type: LOAD_CATALOG,
  payload: data
})

export const catalogFetchStart = (data: Record<string, unknown>): SetDataAction => ({
  type: CATALOG_FETCH_START,
  payload: data
})

export const catalogFetchFinished = (data: Record<string, unknown>): SetDataAction => ({
  type: CATALOG_FETCH_FINISHED,
  payload: data
})

export const catalogFetchFailed = (data: Record<string, unknown>): SetDataAction => ({
  type: CATALOG_FETCH_FAILED,
  payload: data
})


// _____ datasets && Bands
export const setAllDatasets = (data: Record<string, unknown>): SetDataAction => ({
  type: SET_ALL_DATASETS,
  payload: data
})

export const setBands = (data: Record<string, unknown>): SetDataAction => ({
  type: SET_BANDS,
  payload: data
})



//_____ Dummy Data
export const loadInitialSetup = (): LoadDataAction => ({
  type: LOAD_INITIAL_SETUP
})

export const setStateFromUrl = (data: Record<string, unknown>): SetDataAction => ({
  type: SET_STATE_FROM_URL,
  payload: data
})

export const setInitialSetup = (data: Record<string, unknown>): SetDataAction => ({
  type: SET_INITIAL_SETUP,
  payload: data,
})


//_____ Functionality ______
export const setRedChannel = (data: Record<string, unknown>): SetDataAction => ({
  type: SET_RED_CHANNEL,
  payload: data
})

export const setGreenChannel = (data: Record<string, unknown>): SetDataAction => ({
  type: SET_GREEN_CHANNEL,
  payload: data
})

export const setBlueChannel = (data: Record<string, unknown>): SetDataAction => ({
  type: SET_BLUE_CHANNEL,
  payload: data
})

export const setInspectionDate = (data: Record<string, unknown>): SetDataAction => ({
  type: SET_INSPECTION_DATE,
  payload: data
})

export const setComparisonDate = (data: Record<string, unknown>): SetDataAction => ({
  type: SET_COMPARISON_DATE,
  payload: data
})

export const setSelectedDataset = (data: Record<string, unknown>): SetDataAction => ({
  type: SET_SELECTED_DATASET,
  payload: data
})

export const removeMap = (data: Record<string, unknown>): SetDataAction => ({
  type: REMOVE_MAP,
  payload: data
})

export const addMap = (data: Record<string, unknown>): SetDataAction => ({
  type: ADD_MAP,
  payload: data,
})

export const updateMapExtent = (data: Record<string, unknown>): SetDataAction => ({
  type: UPDATE_MAP_EXTENT,
  payload: data
})
