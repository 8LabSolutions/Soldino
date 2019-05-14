import { INCREASEINDEX, DECREASEINDEX, RESETINDEX } from "../constants/actionTypes";

export function increaseIndex() {
  return {
    type: INCREASEINDEX
  };
}

export function decreaseIndex() {
  return {
    type: DECREASEINDEX
  };
}

export function resetIndex() {
  return {
    type: RESETINDEX
  };
}