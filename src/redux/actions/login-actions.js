import axios from "axios";
import * as constants from "../constants";
import store from "../store";

const Mystore = store.getState();

export const validToken = () => {
  //console.log(Mystore)
  let token = localStorage.getItem("token");
  console.log("is valid?", token);
  if (token === undefined) token = "";
  axios
    .get(`${constants.BASE_URL}/api/isTokenValid`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (!res.data) {
        localStorage.removeItem("token");
        //let login = JSON.parse(localStorage.getItem("login"));
        //userLogIn(login.username, login.password);
        console.log("token invalido");
      } else {
        console.log("token valido");
      }
    })
    .catch((error) => console.log(error.message));
};

export const userLogIn = (username, password) => (dispatch) => {
  axios
    .post(`${constants.BASE_URL}/login`, {
      username: username,
      password: password,
    })
    .then((res) => {
      if (res.data !== null && res.data !== undefined) {
        localStorage.setItem("token", res.data);
        console.log("nuevo token", res.data);

        dispatch({
          type: constants.FETCH_TOKEN,
          payload: res.data,
        });
      }
    })
    .catch((error) => console.log(error.message));
};
