export default function reducer(state={
    vendors: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_VENDORS": {
        return {...state, fetching: true}
      }
      case "FETCH_VENDORS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_VENDORS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          vendors: action.payload,
        }
      }
    }

    return state
}
