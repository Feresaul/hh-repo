import axios from "axios";
import * as constants from "../constants";
import store from "../store";

export const getUserList = () => (dispatch) => {
  let token = store.getState().auth.token;
  axios
    .get(`${constants.BASE_URL}/api/frontend/doctors`, {
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
