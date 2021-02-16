import axios from "axios";
import * as constants from "../constants";

export const userLogIn = (username, password) => (dispatch) => {
  axios
    .post(`${constants.BASE_URL}/login`, {
      username: username,
      password: password,
    })
    .then((res) => {
      if (res.data !== null && res.data !== undefined) {
        axios.interceptors.request.use((config) => {
          config.headers.Authorization = `Bearer ${res.data}`;
          return config;
        });

        dispatch({
          type: constants.FETCH_TOKEN,
          payload: res.data,
        });
      }
    })
    .catch((error) => console.log(error.message));
};
