import { createReducer } from '@reduxjs/toolkit'
import { ReduxState } from '../../types'

const initialState: ReduxState = {
  data: {
    global: {
      mapExtent: {
        center: [],
        resolution: 0,
        rotation: 0
      },
      inspectionDate: "",
      comparisonDate: "",
      fullScreen: "",
      mapSize: ""
    },
    maps: []
  },
  cache: {
    catalog: {},
    fetchInProgress: {},
    fetchErrors: {},
    datasets: [],
    windDamages: []
  }
}

const dataReducer = createReducer(initialState, {
  CATALOG_FETCH_START: (state, action) => {
    console.log('Catalog download started')
    console.log('Action payload in reducer: ', action.payload)
    state.cache.fetchInProgress[action.payload.url] = action.payload.inProgress
  },
  CATALOG_FETCH_FINISHED: (state, action) => {
    console.log('Loading Catalog finished! Setting state in Redux')
    console.log('Action payload in reducer: ', action.payload)
    state.cache.fetchInProgress[action.payload.url] = action.payload.inProgress
    state.cache.catalog[action.payload.url] = action.payload.fetchedCatalog
  },
  CATALOG_FETCH_FAILED: (state, action) => {
    console.log('Saving error to reducer!')
    console.log('Action payload in reducer: ', action.payload)
    state.cache.fetchErrors[action.payload.url] = action.payload.error
  },
  SET_INITIAL_SETUP: (state, action) => {
    console.log('Loading initial setup from JSON file and setting state in Redux')
    console.log('Actions pay load in reducer: ', action.payload)
    // state.data.global.bbox = action.payload.data.global.bbox
    state.data.global.inspectionDate = action.payload.data.global.inspectionDate
    state.data.global.fullScreen = action.payload.data.global.fullScreen
    state.data.global.mapSize = action.payload.data.global.mapSize
    state.data.maps = action.payload.data.maps
    // state.cache.catalog = action.payload.cache.catalog.id
    state.cache.datasets = action.payload.cache.datasets
    // state.cache.windDamages = action.payload.cache.windDamages
  },
  SET_RED_CHANNEL: (state, action) => {
    console.log('Setting red channel value in redux')
    console.log('action payload for set red channel: ', action.payload)
    state.data.maps[action.payload.mapComponentIndex].channelSettings.R = action.payload.redChannelValue
  },
  SET_GREEN_CHANNEL: (state, action) => {
    console.log('Setting green channel value in redux')
    console.log('action payload for set green channel: ', action.payload)
    state.data.maps[action.payload.mapComponentIndex].channelSettings.G = action.payload.greenChannelValue
  },
  SET_BLUE_CHANNEL: (state, action) => {
    console.log('Setting blue channel value in redux')
    console.log('action payload for set blue channel: ', action.payload)
    state.data.maps[action.payload.mapComponentIndex].channelSettings.B = action.payload.blueChannelValue
  },
  SET_INSPECTION_DATE: (state, action) => {
    console.log('Setting inspection date in reducer')
    console.log('Action payload: ', action.payload)
    state.data.global.inspectionDate = action.payload.inspectionDate
  },
  SET_COMPARISON_DATE: (state, action) => {
    console.log('Setting comparison date in reducer')
    console.log('Action payload: ', action.payload)
    state.data.global.comparisonDate = action.payload.comparisonDate
  },
  SET_SELECTED_DATASET: (state, action) => {
    console.log('Setting data source or map in reducer')
    console.log('Action payload: ', action.payload)
    state.data.maps[action.payload.mapComponentIndex].selectedDataset = action.payload.selectedDataset
  },
  REMOVE_MAP: (state, action) => {
    console.log('Removing map in reducer')
    console.log('Action payload: ', action.payload)
    state.data.maps = state.data.maps.filter((map) => map.id !== action.payload.id)
  },
  ADD_MAP: (state, action) => {
    console.log('Adding a map in reducer')
    console.log('Action payload: ', action.payload)
    state.data.maps.push(action.payload.mapObject)
  },
  UPDATE_MAP_EXTENT: (state, action) => {
    // console.log('Updating map')
    // console.log('Action payload: ', action.payload)
    state.data.global.mapExtent.center = action.payload.center
    state.data.global.mapExtent.resolution = action.payload.resolution
    state.data.global.mapExtent.rotation = action.payload.rotation
  },
  SET_ALL_DATASETS: (state, action) => {
    console.log('Setting all sources in Reducer')
    console.log('Action payload: ', action.payload)
    state.cache.datasets = action.payload.datasets
  },
  SET_BANDS: (state, action) => {
    console.log('Setting bands in Reducer')
    console.log('Action payload: ', action.payload)
    state.data.maps[action.payload.mapComponentIndex].derivedData.bands = action.payload.bands
  }
})

export default dataReducer