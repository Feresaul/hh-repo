import * as constants from "../constants";

export const auth = (state = {}, action) => {
  switch (action.type) {
    case constants.AUTHENTICATED:
      return { authenticated: action.payload };
    default:
      return state;
  }
};

export const profile = (state = {}, action) => {
  switch (action.type) {
    case constants.FETCH_PROFILE:
      return { ...action.payload, cargo: [...action.payload.cargo, "Administrador"] };
    default:
      return state;
  }
};
