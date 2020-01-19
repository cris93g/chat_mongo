import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import userReducer from "./ducks/userReducer";

const middleware = applyMiddleware(promiseMiddleware);

const combinedReducers = combineReducers({
  userReducer
});

const store = createStore(combinedReducers, middleware);

export default store;
