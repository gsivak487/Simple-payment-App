import axios from "axios";

export function fetchVendors() {
  return function(dispatch) {
    dispatch({type: "FETCH_VENDORS"});
    
    axios.get("http://localhost:3000/getvendors")
      .then((response) => {
        dispatch({type: "FETCH_VENDORS_FULFILLED", payload: response.data})
      })
      .catch((error) => {
        dispatch({type: "FETCH_VENDORS_REJECTED", payload: error})
      })
  }
}
