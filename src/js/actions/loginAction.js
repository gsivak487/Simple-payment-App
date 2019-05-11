import axios from "axios";

  export function checklogin(user) {
  return function (dispatch) {
    dispatch({ type: "FETCH_USER" });
 return axios({
      method: 'post',
      url: 'http://localhost:3000/checklogin',
      data: {
        name: user.name,
        pass: user.pass
      }
    })
      .then((response) => {
        dispatch({ type: "FETCH_USER_FULFILLED", payload: response.data })
        window.sessionStorage.setItem('loginuser', JSON.stringify(response.data));
        return response;
        // if (response.data.loginuserdata == null) {
        //   callback({ "response": "failed" });
        // } else {
        //   window.sessionStorage.setItem('loginuser', JSON.stringify(response.data));
        //   callback({ "response": "success" });
        // }
      })
      .catch((error) => {

        dispatch({ type: "FETCH_USER_REJECTED", payload: error })


      })
  }
}


export function register(user) {
  return function (dispatch) {
    dispatch({ type: "REGISTER_USER" });
    axios({
      method: 'post',
      url: 'http://localhost:3000/register',
      data: {
        FirstName: user.firstName,
        LastName: user.lastName,
        UserName: user.username,
        Password: user.password,
        Designation: user.desg,
      }
    })
      .then((response) => {
        dispatch({ type: "REGISTER_FULFILLED", payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: "REGISTER_REJECTED", payload: error })
      })
  }
}





