import {LOAD_DATA, SET_DATA} from '../Actions/data'

const initialState = {
  jsonFile: undefined
}

const dataReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case LOAD_DATA: 
      return {
        state
      }
    case SET_DATA:
      console.log('Set data in reducer called!')
      return {
        ...state, 
        jsonFile: action.payload
      }
    default: {
      return {
        state
      }
    }
  }
}

export default dataReducer