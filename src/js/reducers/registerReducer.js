export default function reducer(state={
    registerUser:{},
    error: null,
  }, action) {

    switch (action.type) {
      case "REGISTER_USER": {
        return {...state}
      }
      case "REGISTER_REJECTED": {
        return {...state, error: action.payload}
      }
      case "REGISTER_FULFILLED": {
        return {
          ...state,
          registerUser: action.payload,
        }
      }
    }

    return state
}