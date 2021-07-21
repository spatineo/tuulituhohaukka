export const LOAD_DATA = 'LOAD_DATA'
export const SET_DATA = 'SET_DATA'
export const SET_RED_CHANNEL = 'SET_RED_CHANNEL'
export const SET_GREEN_CHANNEL = 'SET_GREEN_CHANNEL'
export const SET_BLUE_CHANNEL = 'SET_BLUE_CHANNEL'

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