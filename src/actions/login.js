/* eslint-disable no-unused-vars */
// src/js/actions/index.js
import { LOGIN, LOGOUT, BUSINESS, GOVERN, CITIZEN, BEGINLOADING, ENDLOADING } from "../constants/actionTypes";

export function logIn(user) {
  return {
    type: LOGIN,
    par: true,
    user
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

export function beginLoading() {
  return {
    type: BEGINLOADING,
    loading: true
  };
}

export function endLoading() {
  return {
    type: ENDLOADING,
    loading: false
  };
}
