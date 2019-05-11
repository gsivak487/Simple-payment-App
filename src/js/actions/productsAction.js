import axios from "axios";

export function fetchProducts() {
  return function(dispatch) {
    dispatch({type: "FETCH_PRODUCTS"});
    
       axios.get("http://localhost:3000/getproducts")
      .then((response) => {
        dispatch({type: "FETCH_PRODUCTS_FULFILLED", payload: response.data})
      })
      .catch((error) => {
        dispatch({type: "FETCH_PRODUCTS_REJECTED", payload: error})
      })
  }
}

