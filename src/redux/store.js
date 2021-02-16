import { createStore, compose, applyMiddleware } from "redux";
import thunks from "redux-thunk";
import reducers from './reducers'

const initialState = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(thunks))
);

export default store;
