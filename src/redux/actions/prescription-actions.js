import axios from "axios";
import * as constants from "../constants";

const user = {
  username: "carrot",
  password: "1234",
};

export const getPrescriptionList = () => (dispatch) => {
  axios
    .get(`${constants.BASE_URL}/api/frontend/prescriptionList`)
    .then((res) => {
      dispatch({
        type: constants.FETCH_PRESCRIPTIONS,
        payload: res.data,
      });
    });
};
