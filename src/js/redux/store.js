import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import thunkMiddleware from "redux-thunk";
const composeEnhancers =
  (process.env.NODE_ENV === "production" &&
    typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
