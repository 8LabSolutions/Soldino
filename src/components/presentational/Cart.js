/* eslint-disable react/jsx-one-expression-per-line */
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import NavBar from './NavBar'
import { store } from "../../store/index";
import CartProduct from './CartProduct';
import Button from './Button';


function printProduct(product) {
  return(
    <CartProduct key={product[0]} title={product[0]} quantity={product[1]} price={product[2]} />
  )
}

class Cart extends Component {

  render() {
    let productsList = store.getState().cart;
    let totalProducts = productsList.length
    let title
    let quantity
    let price
    let product
    let productArray = []
    let totalPrice = 0
    if(store.getState().logged === false){window.location.href = "/"}
    for(var i=0; i<totalProducts; i++){
      title = productsList[i].title
      quantity = productsList[i].quantity
      price = productsList[i].price
      totalPrice += price*quantity
      product = [title, quantity, price]
      productArray[i] = product;
    }
    return (
      <div>
        <NavBar />
        <h1>Cart</h1>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <p>Total price: CC {totalPrice}</p>
            </div>
            <div className="col-sm-12">
              <NavLink className="nav-item nav-link" to="/checkout"><Button text="Checkout" /></NavLink>  
            </div>
            {productArray.map(i => printProduct(i))}
          </div>
        </div>
      </div>
    )
  }
}
export default Cart;