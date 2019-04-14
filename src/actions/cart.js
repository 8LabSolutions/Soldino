/* eslint-disable no-unused-vars */
// src/js/actions/index.js
import { ADDTOCART, REMOVEFROMCART, INCREASEQUANTITY, DECREASEQUANTITY, CARTTOORDERS } from "../constants/actionTypes";
import { getTodayDate, getVAT, getNet, getDetails, getName } from "../auxiliaryFunctions";

/*args: title, quantity, price*/
export function addToCart(product) {
  console.log('cart.js')
  console.log(product)
  return {
    type: ADDTOCART,
      product: {
          title: product[0],
          quantity: product[1],
          price: (Math.round(product[2] * 100) / 100),
          VAT: product[3],
          sellerName: product[4],
          sellerVATNumber: product[5],
          keyProd: product[6]
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
        VAT: product[3],
        sellerName: product[4],
        sellerVATNumber: product[5],
        keyProd: product[6]
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
        VAT: product[3],
        sellerName: product[4],
        sellerVATNumber: product[5],
        keyProd: product[6]
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
        VAT: product[3],
        sellerName: product[4],
        sellerVATNumber: product[5],
        keyProd: product[6]
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
    address,
    buyerName: getName(),
    buyerDetails: getDetails(), //if citizen == surname, if business == VATNumber
  };
}
