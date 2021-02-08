import { combineReducers } from "redux";
import { bugs } from "./reducer";
import { reducer as formReducer } from "redux-form";

const reducers = combineReducers({
  bugs,
  form: formReducer,
});

export default reducers;