import { GETMYORDERS } from "../constants/actionTypes";

export default function getMyProducts(ordersList) {
  return {
    type: GETMYORDERS,
    ordersList
  };
}

