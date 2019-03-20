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

export function removeFromCart(product) {
  return {
    type: REMOVEFROMCART,
    product
  };
}

export function increaseQuantity(quantity) {
  return {
    type: INCREASEQUANTITY,
    quantity
  };
}

export function decreaseQuantity(quantity) {
  return {
    type: DECREASEQUANTITY,
    quantity
  };
}