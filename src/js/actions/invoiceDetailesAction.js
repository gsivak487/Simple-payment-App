import axios from "axios";

export function fetchInvoiceDetailes(invoiceID,token) {
  return function(dispatch) {
    dispatch({type: "FETCH_INVOICESDETAILES"});

  return axios({
      method: 'post',
      url: 'http://localhost:3000/getallinvoicedetailes',
      data: {
        invoiceID:invoiceID,
      },
      headers: {
        x_access_token :token
      }
    }).then((response) => {
        dispatch({type: "FETCH_INVOICESDETAILES_FULFILLED", payload: response.data})
    }).catch((error) => {
        dispatch({type: "FETCH_INVOICESDETAILES_REJECTED", payload: error})
    })
  }
}


export function fetchInvoiceDetailesList(invoiceID,token) {
  return function(dispatch) {
    dispatch({type: "FETCH_INVOICESDETAILESLIST"});

   axios({
      method: 'post',
      url: 'http://localhost:3000/getallinvoicedetaileslist',
      data: {
        invoiceID:invoiceID,
      },headers: {
        x_access_token : token
      }
    }).then((response) => {
        dispatch({type: "FETCH_INVOICESDETAILESLIST_FULFILLED", payload: response.data})
    }).catch((error) => {
      dispatch({type: "FETCH_INVOICESDETAILESLIST_REJECTED", payload: error})
    })
  }
}


