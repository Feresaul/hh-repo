import axios from "axios";
import * as constants from "../constants";
import store from "../store";

export const getPrescriptionList = () => (dispatch) => {
  let token = store.getState().auth.token;
  axios
    .get(`${constants.BASE_URL}/api/frontend/prescriptions`, {
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
