import {GETBUSINESSLIST, GETCITIZENLIST, MINTANDDISTRIBUTE, SETVATREFUND, SETSTATUS, SELECTEDPERIOD, VATPERIODS, RESETVAT } from "../constants/actionTypes";


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

export function resetPeriod() {
  return {
    type: SELECTEDPERIOD,
    period: {id: "Select a quarter", amount: null, payable: false}
  }
}

export function setPeriod(period) {
  return {
    type: SELECTEDPERIOD,
    period
  }
}

export function resetVATPeriods() {
  return {
    type: VATPERIODS,
    periods: []
  }
}

export function setVATPeriod(periods) {
  return {
    type: VATPERIODS,
    periods
  }
}

export function resetVAT() {
  return {
    type: RESETVAT
  }
}
