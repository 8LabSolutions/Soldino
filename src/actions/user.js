import { GETMYORDERS ,SETLOADINGMESSAGE, UPDATEBALANCE } from "../constants/actionTypes";

export function getMyProducts(ordersList) {
  return {
    type: GETMYORDERS,
    ordersList
  };
}

export function setLoadingMessage(message) {
  return {
    type: SETLOADINGMESSAGE,
    message
  }
}


export function updateBalance(balance) {
  return {
    type: UPDATEBALANCE,
    balance
  }
}
