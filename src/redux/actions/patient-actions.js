import axios from "axios";
import * as constants from "../constants";
import store from "../store";

export const getPatientList = () => {
  console.log("getPatientList()");
  let token = sessionStorage.getItem("token");
  axios
    .get(`${constants.BASE_URL}/api/frontend/doctors`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      store.dispatch({
        type: constants.FETCH_USERS,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
};
