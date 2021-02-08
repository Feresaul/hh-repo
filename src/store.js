import { createStore, compose, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunks from "redux-thunk";

const initialState = {
    bugs: [],
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(thunks))
);

export default store;
