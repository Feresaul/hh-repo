import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { prescriptions } from "./prescriptions";
import { users, user } from "./users";
import { token } from "./login";

export default combineReducers({
  form: formReducer,
  prescriptions,
  users,
  user,
  token,
});
