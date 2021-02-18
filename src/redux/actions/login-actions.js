import axios from "axios";
import * as constants from "../constants";
import store from "../store";

export const validToken = () => (dispatch) => {
  let token = store.getState().auth.token;
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
      dispatch({
        type: constants.FETCH_TOKEN,
        payload: res.data !== undefined ? res.data : "",
      });
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
  let token = store.getState().auth.token;
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
    });
};
