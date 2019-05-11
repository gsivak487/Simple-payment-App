import axios from "axios";

export function fetchInvoicesForUser(user) {
  return function(dispatch) {
    dispatch({type: "FETCH_INVOICES"});
    
    axios({
      method: 'post',
      url: 'http://localhost:3000/getallinvoiceitemsforuser',
      headers: {
        x_access_token : user.token
      }
    })
      .then((response) => {
        dispatch({type: "FETCH_INVOICES_FULFILLED", payload: response.data})
      })
      .catch((error) => {
        dispatch({type: "FETCH_INVOICES_REJECTED", payload: error})
      })
  }
}
