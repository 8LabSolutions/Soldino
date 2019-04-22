import {GETUSERLIST, MINTANDDISTRIBUTE } from "../constants/actionTypes";


export function getUserList(userList) {
  return {
    type: GETUSERLIST,
    userList
  };
}

export function getGovernmentBalanceAndTotalAmount(amount, total) {
  return {
    type: MINTANDDISTRIBUTE,
    amount,
    total
  };
}
