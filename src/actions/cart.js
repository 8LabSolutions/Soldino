/* eslint-disable no-unused-vars */
// src/js/actions/index.js
import { ADDTOCART, REMOVEFROMCART, INCREASEQUANTITY, DECREASEQUANTITY, CARTTOORDERS } from "../constants/actionTypes";
import { getTodayDate, getVAT, getNet } from "../auxiliaryFunctions";

{/*args: title, quantity, price*/}
export function addToCart(product) {
  return {
    type: ADDTOCART,
      product: {
          title: product[0], 
          quantity: product[1], 
          price: (Math.round(product[2] * 100) / 100),
          VAT: product[3]
      }
  };
}

export function removeFromCart(product) {
  return {
    type: REMOVEFROMCART,
      product: {
        title: product[0], 
        quantity: product[1], 
        price: product[2],
        VAT: product[3]
    }
  };
}

export function increaseQuantity(product) {
  return {
    type: INCREASEQUANTITY,
      product: {
        title: product[0], 
        quantity: +product[1]+1, 
        price: product[2],
        VAT: product[3]
    }
  };
}

export function decreaseQuantity(product) {
  return {
    type: DECREASEQUANTITY,
      product: {
        title: product[0], 
        quantity: product[1], 
        price: product[2],
        VAT: product[3]
    }
  };
}

export function cartToOrders(cart, address) {
  return {
    type: CARTTOORDERS,
    cart,
    date: getTodayDate(),
    number: 1, //progressive
    VAT: getVAT(cart),
    net: getNet(cart),
    address
  };
}