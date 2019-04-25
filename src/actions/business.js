import { GETMYPRODUCTS, GETSTOREPRODUCTS, SETTOTALNUMBEROFPRODUCTS, SETTOTALNUMBEROFMYPRODUCTS } from "../constants/actionTypes";

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
export  function setTotalNumberOfProducts(value) {
  return {
    type: SETTOTALNUMBEROFPRODUCTS,
    value
  };
}
export  function setTotalNumberOfMyProducts(value) {
  return {
    type: SETTOTALNUMBEROFMYPRODUCTS,
    value
  };
}
