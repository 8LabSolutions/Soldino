// src/js/actions/index.js
import { ADDTOCART, REMOVEFROMCART, INCREASEQUANTITY, DECREASEQUANTITY } from "../constants/actionTypes";

export function addToCart(title, quantity, price) {
  return {
    type: ADDTOCART,
      product: {
          title, 
          quantity, 
          price
      }
  };
}

export function removeFromCart(title, quantity, price) {
  return {
    type: REMOVEFROMCART,
      product: {
        title, 
        quantity, 
        price
    }
  };
}

export function increaseQuantity(title, quantity, price) {
  return {
    type: INCREASEQUANTITY,
      product: {
        title, 
        quantity, 
        price
    }
  };
}

export function decreaseQuantity(title, quantity, price) {
  return {
    type: DECREASEQUANTITY,
      product: {
        title, 
        quantity, 
        price
    }
  };
}