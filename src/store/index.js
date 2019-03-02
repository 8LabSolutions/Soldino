// src/js/store/index.js
import { createStore } from "redux";
import rootReducer from "../reducers/index";

const store = createStore(
  rootReducer,
  //da rimuovere
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
