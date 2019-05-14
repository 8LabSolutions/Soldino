/* eslint-disable import/prefer-default-export */
// src/js/actions/index.js
import { SEARCH } from "../constants/actionTypes";

export function searchaction(str) {
  return {
    type: SEARCH,
    str
  };
}

