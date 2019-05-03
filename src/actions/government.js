import {GETBUSINESSLIST, GETCITIZENLIST, MINTANDDISTRIBUTE, SETVATREFUND, SETSTATUS } from "../constants/actionTypes";


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

export function setVATrefund(VATRefundList) {
  return {
    type: SETVATREFUND,
    VATRefundList
  }
}

export function setStatus(selectedStatus) {
  return {
    type: SETSTATUS,
    selectedStatus
  }
}