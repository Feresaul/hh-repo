import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { prescriptions } from "./prescriptions";
import { users } from "./users";
import { auth, profile } from "./login";

export default combineReducers({
  form: formReducer,
  prescriptions,
  users,
  auth,
  profile,
});
