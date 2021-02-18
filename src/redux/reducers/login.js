import * as constants from "../constants";

export const auth = (state = { authenticated: false }, action) => {
  switch (action.type) {
    case constants.FETCH_TOKEN:
      return { ...state, token: action.payload };
    case constants.AUTHENTICATED:
      return { ...state, authenticated: action.payload };
    default:
      return state;
  }
};

export const profile = (state = {}, action) => {
  switch (action.type) {
    case constants.FETCH_PROFILE:
      return action.payload;
    default:
      return state;
  }
};
