import { createReducer } from '@reduxjs/toolkit'

// --> Create interface for initialState

interface FetchInProgress {
  [key: string]: boolean
}

interface FetchError {
  [key: string]: string
}

const initialState = {
  data: {
    global: {
      bbox: [],
      inspectionDate: "",
      comparisonDate: "",
      fullScreen: "",
      mapSize: ""
    },
    maps: []
  },
  cache: {
    catalog: {},
    fetchInProgress: {} as FetchInProgress,
    fetchErrors: {} as FetchError,
    sources: [],
    windDamages: []
  }
}

const dataReducer = createReducer(initialState, {
  SET_ROOT_CATALOG: (state, action) => {
    console.log('Catalog')
    console.log('Action payload in reducer: ', action.payload)
    state.cache.catalog = action.payload.rootCatalog
  },
  CATALOG_FETCH_START: (state, action) => {
    console.log('Catalog download started')
    console.log('Action payload in reducer: ', action.payload)
    state.cache.fetchInProgress[action.url] = action.payload.inProgress
  },
  CATALOG_FETCH_FINISHED: (state, action) => {
    console.log('Loading rootCatalog finished! Setting state in Redux')
    console.log('Action payload in reducer: ', action.payload)
    state.cache.fetchInProgress[action.url] = action.payload.inProgress
    state.cache.catalog = action.payload.fetchedCatalog
  },
  CATALOG_FETCH_FAILED: (state, action) => {
    console.log('Error while loading rootCatalog!')
    console.log('Action payload in reducer: ', action.payload)
    state.cache.fetchErrors[action.url] = action.error
  },
  SET_DATA: (state, action) => {
    console.log('Loading data from JSON file and setting state in Redux')
    console.log('Actions pay load in reducer: ', action.payload)
    state.data.global.bbox = action.payload.data.global.bbox
    state.data.global.inspectionDate = action.payload.data.global.inspectionDate
    state.data.global.fullScreen = action.payload.data.global.fullScreen
    state.data.global.mapSize = action.payload.data.global.mapSize
    state.data.maps = action.payload.data.maps
    state.cache.catalog = action.payload.cache.catalog.id
    state.cache.sources = action.payload.cache.sources
    state.cache.windDamages = action.payload.cache.windDamages
  },
  SET_RED_CHANNEL: (state: any, action) => {
    console.log('Setting red channel value in redux')
    console.log('action payload for set red channel: ', action.payload)
    state.data.maps[action.payload.mapComponentIndex].channelSettings.R = action.payload.redChannelValue
  },
  SET_GREEN_CHANNEL: (state: any, action) => {
    console.log('Setting green channel value in redux')
    console.log('action payload for set green channel: ', action.payload)
    state.data.maps[action.payload.mapComponentIndex].channelSettings.G = action.payload.greenChannelValue
  },
  SET_BLUE_CHANNEL: (state: any, action) => {
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
  SET_DATA_SOURCE: (state: any, action) => {
    console.log('Setting data source or map in reducer')
    console.log('Action payload: ', action.payload)
    state.data.maps[action.payload.mapComponentIndex].selectedSource = action.payload.selectedSource
  },
  REMOVE_MAP: (state: any, action) => {
    console.log('Removing map in reducer')
    console.log('Action payload: ', action.payload)
    state.data.maps = state.data.maps.filter((map: any) => map.id !== action.payload.id)
  },
  ADD_MAP: (state: any, action) => {
    console.log('Adding a map in reducer')
    console.log('Action payload: ', action.payload)
    state.data.maps.push(action.payload.mapObject)
  }

})







// const dataReducer = (state = initialState, action: any): any => {
//   switch (action.type) {
//     case LOAD_DATA: 
//       return {
//         state
//       }
//     case SET_DATA:
//       console.log('Set data in reducer called!')
//       return {
//         ...state, 
//         data: {
//           ...state.data, 
//           global: {
//             ...state.data.global, 
//             bbox: action.payload.data.global.bbox
//           }
//         }
//       }
//     default: {
//       return {
//         state
//       }
//     }
//   }
// }

export default dataReducer