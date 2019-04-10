/* eslint-disable no-unused-vars */
// src/js/actions/index.js
import { LOGIN, LOGOUT, BUSINESS, GOVERN, CITIZEN } from "../constants/actionTypes";

export function logIn() {
  return {
    type: LOGIN,
    par: true
  };
}

export function logOut() {
  return {
    type: LOGOUT,
    par: false,
    user: null
  };
}

export function logCitizen(user) {
  return {
    type: CITIZEN,
    user
  };
}

export function logBusiness(user) {
  return {
    type: BUSINESS,
    user
  };
}

export function logGovern(user) {
  return {
    type: GOVERN,
    user
  };
}

