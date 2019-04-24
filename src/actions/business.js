import { GETMYPRODUCTS, GETSTOREPRODUCTS } from "../constants/actionTypes";

export  function getMyProducts(myProductsArray) {
  return {
    type: GETMYPRODUCTS,
    myProductsArray
  };
}
export  function getStoreProducts(storeProducts) {
  return {
    type: GETSTOREPRODUCTS,
    storeProducts
  };
}

