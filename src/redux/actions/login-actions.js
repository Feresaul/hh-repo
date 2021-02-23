import axios from "axios";
import * as constants from "../constants";

export const validToken = () => (dispatch) => {
  let token = sessionStorage.getItem("token");
  if (token === null) token = "x";
  if (token !== undefined) {
    axios
      .get(`${constants.BASE_URL}/api/isTokenValid`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({
          type: constants.AUTHENTICATED,
          payload: res.data,
        });
      })
      .catch((error) => console.log(error.message));
  }
};

export const userLogIn = (username, password) => (dispatch) => {
  axios
    .post(`${constants.BASE_URL}/login`, {
      username: username,
      password: password,
    })
    .then((res) => {
      sessionStorage.setItem("token", res.data !== undefined ? res.data : null);
      dispatch({
        type: constants.AUTHENTICATED,
        payload: res.data !== undefined ? true : false,
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const whoAmI = () => (dispatch) => {
  console.log("WhoAmI");
  let token = sessionStorage.getItem("token");
  axios
    .get(`${constants.BASE_URL}/api/frontend/whoami`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch({
        type: constants.FETCH_PROFILE,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
};
