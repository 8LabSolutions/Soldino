/* eslint-disable import/prefer-default-export */
import { CARTTOPENDING } from "../constants/actionTypes";

export function cartToPending(cart) {
  return {
    type: CARTTOPENDING,
      cart
  };
}