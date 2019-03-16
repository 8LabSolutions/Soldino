/* eslint-disable import/prefer-default-export */
import { RESET } from "../constants/actionTypes";

export function reset() {
  return {
    type: RESET,
    par: false
  };
}