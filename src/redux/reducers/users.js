import * as constants from "../constants";

export const users = (state = {}, action) => {
  switch (action.type) {
    case constants.FETCH_USERS:
      return action.payload;
    default:
      return state;
  }
};

export const user = (state = {}, action) => {
  switch (action.type) {
    case constants.FETCH_USER:
      return action.payload;
    default:
      return state;
  }
};

