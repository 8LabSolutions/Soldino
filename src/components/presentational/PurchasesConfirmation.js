/* eslint-disable react/jsx-one-expression-per-line */
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from './NavBar'
import ButtonGeneric from '../containers/ButtonGeneric';
import { store } from "../../store/index";
import PendingOrder from './PendingOrder';

class PurchasesConfirmation extends Component {

  printProduct(product) {
    return(
      <li className="list-group-item">
        <PendingOrder title={product.title} quantity={product.quantity} price={product.price} />
      </li>
    )
  }
  
  printOrder(order) {
    let orderCost = 0
    order.map (i => orderCost += (i.price*i.quantity))
    return(
      <div>
        <ul className="list-group">
          <div className="col-sm-12">
            {order.map (i => this.printProduct(i))}
            <li className="list-group-item">
              <div className="col-sm-12">Total: CC {orderCost}</div>
            </li>
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

  render() {
    let ordersList = store.getState().pending;
    let totalOrders = ordersList.length
    return (
      <div>
        <NavBar />
        <h3>Purchases confirmation</h3>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              { totalOrders===0 ? <p>Nothing here</p> : ordersList.map(i => this.printOrder(i)) }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default PurchasesConfirmation;