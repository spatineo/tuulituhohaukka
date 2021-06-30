// Example reducer

const initialState = {

}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION1:
      return {
        ...state, 
        // Edit the state here eg:
        // id: action.objectName.id
      }
    default: 
      return {
        state
      }
  }
}

export default dataReducer