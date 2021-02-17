import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { prescriptions, prescription } from "./prescriptions";
import { users, user } from "./users";
import { token } from "./login";

export default combineReducers({
  form: formReducer,
  prescriptions,
  prescription,
  users,
  user,
  token,
});
