export const LOAD_DATA = 'LOAD_DATA'
export const SET_DATA = 'SET_DATA'

interface LoadDataAction {
  type: string
}
interface setDataAction {
  type:string
  payload: JSON
}

export const loadData = ():LoadDataAction => ({
  type: LOAD_DATA
})

export const setData = (data: JSON): setDataAction => ({
  type: SET_DATA, 
  payload: data,
})