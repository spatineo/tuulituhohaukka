import { createReducer } from '@reduxjs/toolkit'
import {
  LOAD_DATA,
  SET_DATA,
  SET_RED_CHANNEL,
  SET_GREEN_CHANNEL,
  SET_BLUE_CHANNEL,
  SET_INSPECTION_DATE,
} from '../Actions/data'
import { ReduxState } from '../../types'

// const initialState = {
//   jsonFile: undefined
// }

const initialState = {
  data: {
    global: {
      mapExtent: {
        center: '',
        resolution: '',
        rotation: ''
      },
      inspectionDate: "",
      comparisonDate: "",
      fullScreen: "",
      mapSize: ""
    },
    maps: []
  },
  cache: {
    catalogue: {},
    sources: [],
    windDamages: []
  }
}

const dataReducer = createReducer(initialState, {
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
  SET_DATA: (state, action) => {
    console.log('Loading data from JSON file and setting state in Redux')
    console.log('Actions pay load in reducer: ', action.payload)
    // state.data.global.bbox = action.payload.data.global.bbox
    state.data.global.inspectionDate = action.payload.data.global.inspectionDate
    state.data.global.fullScreen = action.payload.data.global.fullScreen
    state.data.global.mapSize = action.payload.data.global.mapSize
    state.data.maps = action.payload.data.maps
    state.cache.catalogue = action.payload.cache.catalogue.id
    state.cache.sources = action.payload.cache.sources
    state.cache.windDamages = action.payload.cache.windDamages
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
  },
  UPDATE_MAP_EXTENT: (state: any, action) => {
    console.log('Updating map')
    console.log('Action payload: ', action.payload)
    state.data.global.mapExtent.center = action.payload.center
    state.data.global.mapExtent.resolution = action.payload.resolution
    state.data.global.mapExtent.rotation = action.payload.rotation
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