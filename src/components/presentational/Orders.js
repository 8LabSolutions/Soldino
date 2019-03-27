/* eslint-disable react/jsx-one-expression-per-line */
import React, {Component} from 'react';
import NavBar from './NavBar'
import { store } from "../../store/index";
import PendingOrder from './PendingOrder';
import { printShipment } from '../../auxiliaryFunctions';

class Orders extends Component {

  printProduct(product) {
    return(
      <li className="list-group-item">
        <PendingOrder title={product.title} quantity={product.quantity} price={product.price} />
      </li>
    )
  }
  
  printOrder(order) {
    let orderCost = 0
    {order.products.map (i => orderCost += (i.price*i.quantity))}
    if(store.getState().logged === false){window.location.href = "/"}
    return(
      <div>
        <ul className="list-group">
          <div className="col-sm-12">
            <li className="list-group-item">
              <div className="container">
                <div className="row">
                  <div className="col-sm-3">Order #{order.number}</div>
                  <div className="col-sm-2">{order.date}</div>
                  <div className="col-sm-7">{printShipment(order.address)}</div>
                </div>
              </div>
            </li>

            {order.products.map (i => this.printProduct(i))}
            <li className="list-group-item">
              <div className="container">
                <div className="row">
                  <div className="col-sm-4">VAT Price: CC {order.VAT}</div>
                  <div className="col-sm-4">Net Price: CC {order.net}</div>
                  <div className="col-sm-4"><strong>Total Price: CC {orderCost}</strong></div>
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
    let ordersList = store.getState().ordersList;
    let totalOrders = ordersList.length
    return (
      <div>
        <NavBar />
        <h3>Orders</h3>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              { totalOrders===0 ? <p>Nothing here</p> : ordersList.map(i => {return this.printOrder(i)}) }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Orders;