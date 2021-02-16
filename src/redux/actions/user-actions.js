import axios from "axios";
import * as constants from "../constants";

export const getUserList = () => (dispatch) => {
  axios.get(`${constants.BASE_URL}/api/frontend/userList`).then((res) => {
    dispatch({
      type: constants.FETCH_USERS,
      payload: res.data,
    });
  });
};

export const getUserById = (id) => (dispatch) => {
    console.log(id)
  axios.get(`${constants.BASE_URL}/api/frontend/doctors/${id}`).then((res) => {
    dispatch({
      type: constants.FETCH_USER,
      payload: res.data,
    });
  });
};
