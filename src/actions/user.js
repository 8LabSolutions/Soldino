import { GETMYORDERS ,SETLOADINGMESSAGE } from "../constants/actionTypes";

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

