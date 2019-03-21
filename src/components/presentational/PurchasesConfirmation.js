/* eslint-disable react/jsx-one-expression-per-line */
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from './NavBar'
import ButtonGeneric from '../containers/ButtonGeneric';
import { store } from "../../store/index";
import PendingOrder from './PendingOrder';

function printProduct(product) {
  return(
    <li className="list-group-item">
      <PendingOrder title={product.title} quantity={product.quantity} price={product.price} />
    </li>
  )
}

function printOrder(order) {
  return(
    <div>
      <ul className="list-group">
        <div className="col-sm-12">
          {order.map (i => printProduct(i))}
          <li className="list-group-item">
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  <NavLink className="nav-item nav-link" to="/purchasesconfirmation">
                    <ButtonGeneric text="Reject" />
                  </NavLink>  
                </div>
                <div className="col-sm-6">
                  <NavLink className="nav-item nav-link" to="/purchasesconfirmation">
                    <ButtonGeneric text="Approve" />
                  </NavLink>  
                </div>
              </div>
            </div>
          </li>
        </div>
      </ul>
      <br />
    </div>
  )
}

class PurchasesConfirmation extends Component {

  render() {
    let ordersList = store.getState().pending;
    let totalOrders = ordersList.length
    /*let totalProducts
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
    }*/
    return (
      <div>
        <NavBar />
        <h1>Purchases confirmation</h1>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              { totalOrders===0 ? <p>Nothing here</p> : ordersList.map(i => printOrder(i)) }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default PurchasesConfirmation;