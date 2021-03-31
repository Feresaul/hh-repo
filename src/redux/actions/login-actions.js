import axios from "axios";
import * as constants from "../constants";
import store from "../store";

export async function ValidToken() {
  console.log("IsValidToken()");
  let token = sessionStorage.getItem("token");
  if (token === null) token = "x";
  if (token !== undefined) {
    await axios
      .get(`${constants.BASE_URL}/api/isTokenValid`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        store.dispatch({
          type: constants.AUTHENTICATED,
          payload: res.data,
        });
      })
      .catch((error) => console.log(error.message));
  }
}

export async function userLogIn(username, password) {
  var res;
  await axios
    .post(`${constants.BASE_URL}/login`, {
      username: username,
      password: password,
    })
    .then((res) => {
      sessionStorage.setItem("token", res.data !== undefined ? res.data : null);
      store.dispatch({
        type: constants.AUTHENTICATED,
        payload: res.data !== undefined ? true : false,
      });
    })
    .catch((error) => {
      window.alert("Error de Servidor: " + error.message);
      res = { hasError: true };
    });
  return res;
}

export async function whoAmI() {
  console.log("WhoAmI");
  let token = sessionStorage.getItem("token");
  await axios
    .get(`${constants.BASE_URL}/api/frontend/whoami`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      store.dispatch({
        type: constants.FETCH_PROFILE,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
}
