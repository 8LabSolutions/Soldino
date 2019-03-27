/* eslint-disable no-unused-vars */
// src/js/actions/index.js
import { ADDTOCART, REMOVEFROMCART, INCREASEQUANTITY, DECREASEQUANTITY, CARTTOORDERS } from "../constants/actionTypes";

{/*args: title, quantity, price*/}
export function addToCart(product) {
  return {
    type: ADDTOCART,
      product: {
          title: product[0], 
          quantity: product[1], 
          price: product[2]
      }
  };
}

export function removeFromCart(product) {
  return {
    type: REMOVEFROMCART,
      product: {
        title: product[0], 
        quantity: product[1], 
        price: product[2]
    }
  };
}

export function increaseQuantity(product) {
  return {
    type: INCREASEQUANTITY,
      product: {
        title: product[0], 
        quantity: +product[1]+1, 
        price: product[2]
    }
  };
}

export function decreaseQuantity(product) {
  return {
    type: DECREASEQUANTITY,
      product: {
        title: product[0], 
        quantity: product[1], 
        price: product[2]
    }
  };
}

export function cartToOrders(cart) {
  return {
    type: CARTTOORDERS,
      cart
  };
}