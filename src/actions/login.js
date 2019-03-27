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

export function logCitizen() {
  return {
    type: CITIZEN,
    user: "Citizen"
  };
}

export function logBusiness() {
  return {
    type: BUSINESS,
    user: "Business"
  };
}

export function logGovern() {
  return {
    type: GOVERN,
    user: "Govern"
  };
}

