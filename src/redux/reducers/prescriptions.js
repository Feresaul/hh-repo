import * as constants from "../constants";

export const prescriptions = (state = {}, action) => {
  switch (action.type) {
    case constants.FETCH_PRESCRIPTIONS:
      return action.payload;
    default:
      return state;
  }
};

export const prescription = (state = {}, action) => {
  switch (action.type) {
    case constants.FETCH_PRESCRIPTION:
      return action.payload;
    default:
      return state;
  }
};
