import {createReducer} from '@reduxjs/toolkit'
import {LOAD_DATA, SET_DATA} from '../Actions/data'

// const initialState = {
//   jsonFile: undefined
// }

const initialState = {
  data: {
    global: {
      bbox: [], 
      selectedTime: "",
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
  SET_DATA: (state, action) => {
    console.log('Actions pay load in reducer: ', action.payload)
    state.data.global.bbox = action.payload.data.global.bbox
    state.data.global.selectedTime = action.payload.data.global.selectedTime
    state.data.global.fullScreen = action.payload.data.global.fullScreen
    state.data.global.mapSize = action.payload.data.global.mapSize
    state.data.maps = action.payload.maps
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