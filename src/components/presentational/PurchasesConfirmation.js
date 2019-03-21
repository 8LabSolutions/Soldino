/* eslint-disable react/jsx-one-expression-per-line */
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from './NavBar'
import { store } from "../../store/index";
import PendingOrder from './PendingOrder';
import ButtonGeneric from '../containers/ButtonGeneric';

function printProduct(product) {
  return(
    <PendingOrder key={product[0]} title={product[0]} quantity={product[1]} price={product[2]} />
  )
}

class PurchasesConfirmation extends Component {

  render() {
    let ordersList = store.getState().pending;
    let totalOrders = ordersList.length
    let totalProducts
    let numberOfProducts = 0
    let title
    let quantity
    let price
    let product
    let productArray = []
    let totalPrice = 0
    if(store.getState().logged === false){window.location.href = "/"}
    for(var j=0; j<totalOrders; j++){
      totalProducts = ordersList[j].length
      for(var i=0; i<totalProducts; i++){
        title = ordersList[j][i].title
        quantity = ordersList[j][i].quantity
        price = ordersList[j][i].price
        totalPrice += price*quantity
        product = [title, quantity, price]
        productArray[i+numberOfProducts] = product;
      }
      numberOfProducts += totalProducts
    }
    return (
      <div>
        <NavBar />
        <h1>Purchases confirmation</h1>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <p>Total price: CC {totalPrice}</p>
            </div>
            <div className="col-sm-12">
              { numberOfProducts===0 ? <NavLink className="nav-item nav-link" to="/errorcheckout"><ButtonGeneric text="Checkout" /></NavLink> : <NavLink className="nav-item nav-link" to="/checkout"><ButtonGeneric text="Checkout" /></NavLink> }
            </div>
            {productArray.map(i => printProduct(i))}
          </div>
        </div>
      </div>
    )
  }
}
export default PurchasesConfirmation;