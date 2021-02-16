import { FETCH_TOKEN} from "../constants";

export const token = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TOKEN:
      return action.payload;
    default:
      return state;
  }
};
