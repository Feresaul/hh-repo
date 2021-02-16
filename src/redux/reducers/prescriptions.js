import { FETCH_PRESCRIPTIONS } from "../constants";

export const prescriptions = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRESCRIPTIONS:
      return action.payload;
    default:
      return state;
  }
};
