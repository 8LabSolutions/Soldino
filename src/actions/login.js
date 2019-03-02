// src/js/actions/index.js
import { LOGIN, LOGOUT } from "../constants/actionTypes";

export function logIn() {
  return {
    type: LOGIN,
    par: true
  };
}

export function logOut() {
  return {
    type: LOGOUT,
    par: false
  };
}
