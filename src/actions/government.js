import {GETUSERLIST, MINTANDDISTRIBUTE, CHANGESTATE } from "../constants/actionTypes";


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

export function changeUserState(newList) {
  return {
    type: CHANGESTATE,
    newList
  }
}
