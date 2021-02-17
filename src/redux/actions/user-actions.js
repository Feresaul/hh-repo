import axios from "axios";
import * as constants from "../constants";
import { validToken } from "./login-actions";

export const getUserList = () => (dispatch) => {
  let token = localStorage.getItem("token");
  validToken();
  axios
    .get(`${constants.BASE_URL}/api/frontend/userList`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch({
        type: constants.FETCH_USERS,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const getUserById = (id) => (dispatch) => {
  validToken();
  let token = localStorage.getItem("token");
  axios
    .get(`${constants.BASE_URL}/api/frontend/doctors/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch({
        type: constants.FETCH_USER,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
};
