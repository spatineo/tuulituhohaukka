export const LOAD_DATA = 'LOAD_DATA'
export const SET_DATA = 'SET_DATA'

export const loadData = () => ({
  type: LOAD_DATA
})

export const setData = (data: any) => ({
  type: SET_DATA, 
  payload: data,
})