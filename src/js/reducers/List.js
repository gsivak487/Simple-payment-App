export default function reducer(state={
    invoiceDetailesList: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {
  
    switch (action.type) {
      case "FETCH_INVOICESDETAILESLIST": {
        return {...state, fetching: true}
      }
      case "FETCH_INVOICESDETAILESLIST_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_INVOICESDETAILESLIST_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          invoiceDetailesList: action.payload,
        }
      }
    }
  
    return state
  }