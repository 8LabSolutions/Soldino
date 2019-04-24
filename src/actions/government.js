import {GETBUSINESSLIST, GETCITIZENLIST, MINTANDDISTRIBUTE } from "../constants/actionTypes";


export function getCitizenList(citizenList) {
  return {
    type: GETCITIZENLIST,
    citizenList
  };
}

export function getBusinessList(businessList) {
  return {
    type: GETBUSINESSLIST,
    businessList
  };
}

export function getGovernmentBalanceAndTotalAmount(amount, total) {
  return {
    type: MINTANDDISTRIBUTE,
    amount,
    total
  };
}
