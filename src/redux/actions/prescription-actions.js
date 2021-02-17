import axios from "axios";
import * as constants from "../constants";
import { validToken } from "./login-actions";

export const getPrescriptionList = () => (dispatch) => {
  validToken();
  let token = localStorage.getItem("token");
  axios
    .get(`${constants.BASE_URL}/api/frontend/prescriptionList`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch({
        type: constants.FETCH_PRESCRIPTIONS,
        payload: res.data,
      });
    });
};

export const getPrescriptionById = (id) => (dispatch) => {
  validToken();
  let token = localStorage.getItem("token");
  axios
    .get(`${constants.BASE_URL}/api/frontend/prescriptions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: constants.FETCH_PRESCRIPTION,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
};
