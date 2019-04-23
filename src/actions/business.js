import { GETMYPRODUCTS } from "../constants/actionTypes";

export default function getMyProducts(myProductsArray) {
  return {
    type: GETMYPRODUCTS,
    myProductsArray
  };
}

