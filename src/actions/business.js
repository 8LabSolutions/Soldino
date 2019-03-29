/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
// src/js/actions/index.js
import { ADDTOSELLING } from "../constants/actionTypes";

export function addToSelling(product) {
  return {
    type: ADDTOSELLING,
      product: {
          title: product[0], 
          price: (Math.round(product[2] * 100) / 100),
          VAT: product[3],
          sellerName: product[4],
          sellerVATNumber: product[5]
      }
  };
}