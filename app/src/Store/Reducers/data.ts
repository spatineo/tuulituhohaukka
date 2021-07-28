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
      bbox: [],
      inspectionDate: "",
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
    console.log('Setting red channel value in redux')
    console.log('action payload for set red channel: ', action.payload)
    state.data.maps[action.payload.mapComponentIndex].channelSettings.G = action.payload.greenChannelValue
  },
  SET_BLUE_CHANNEL: (state: any, action) => {
    console.log('Setting red channel value in redux')
    console.log('action payload for set red channel: ', action.payload)
    state.data.maps[action.payload.mapComponentIndex].channelSettings.B = action.payload.blueChannelValue
  },
  SET_DATA: (state, action) => {
    console.log('Actions pay load in reducer: ', action.payload)
    state.data.global.bbox = action.payload.data.global.bbox
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