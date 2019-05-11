export default function reducer(state={
    invoiceDetailes: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_INVOICESDETAILES": {
        return {...state, fetching: true}
      }
      case "FETCH_INVOICESDETAILES_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_INVOICESDETAILES_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          invoiceDetailes: action.payload,
        }
      }
    }

    return state
}

