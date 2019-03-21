/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
// src/js/actions/index.js
import { CARTTOPENDING } from "../constants/actionTypes";

export function cartToPending(cart, arg2, arg3) {
  return {
    type: CARTTOPENDING,
      cart
  };
}