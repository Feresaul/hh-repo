import axios from "axios";
import * as constants from "../constants";
import store from "../store";

export const getPrescriptionList = () => (dispatch) => {
  let token = sessionStorage.getItem("token"); 
  axios
    .get(`${constants.BASE_URL}/api/frontend/prescriptions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log("Doctor jefe", res.data);
      dispatch({
        type: constants.FETCH_PRESCRIPTIONS,
        payload: res.data,
      });
    });
};

export const getPrescriptionsByDoctorId = () => (dispatch) => {
  let storeR = store.getState();
  let token = sessionStorage.getItem("token");
  let id = storeR.profile.medico.id;
  axios
    .get(`${constants.BASE_URL}/api/frontend/prescriptions/byDoctorId/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log("Doctor", res.data);
      dispatch({
        type: constants.FETCH_PRESCRIPTIONS,
        payload: res.data,
      });
    });
};
