import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunks from "redux-thunk";
import { reducer as reduxForm } from "redux-form";

const initialState = {};

const reducers = combineReducers({
  form: reduxForm,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(thunks))
);

export default store;
