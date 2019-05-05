/* eslint-disable react/jsx-one-expression-per-line */
import React, {Component} from 'react';
import NavBar from './NavBar'
import PendingOrder from './PendingOrder';
import { printShipment, round, checkBusiness, checkCitizen } from '../../auxiliaryFunctions';

class Orders extends Component {


  lastSeller = "";

  componentWillMount(){
    let {getOrdersList} = this.props;
    getOrdersList();
  }

  printSeller(product) {

    return(
      <div>
        {(this.lastSeller!=="") ? <hr /> : null}
        <div className="container">
          <div className="row">
            <div className="col-sm-6"><small>Seller</small></div>
            <div className="col-sm-6"><small>VAT Number</small></div>
            <div className="col-sm-6">{this.lastSeller = product.sellerName}</div>
            <div className="col-sm-6">{product.sellerVATNumber}</div>
            <div className="col-sm-4"><small>Products</small></div>
            <div className="col-sm-4"><small>Quantity</small></div>
            <div className="col-sm-4"><small>Unit price</small></div>
          </div>
        </div>
        {this.printProduct(product)}
      </div>
    )
  }


  printProduct(product) {
    return(
      <div>
        <PendingOrder title={product.title} quantity={product.quantity} price={product.price} />
      </div>
    )
  }

  printOrder(order) {
    this.lastSeller = "";
    let orderCost = 0
    //ordinamento per seller
    order.products.sort((a, b) => (a.sellerName > b.sellerName) ? 1 : (a.sellerName === b.sellerName) ? ((a.sellerName > b.sellerName) ? 1 : -1) : -1 )
    order.products.map (i => orderCost += (i.price*i.quantity))
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
            <li className="list-group-item">
              {order.products.map (i => (
                (this.lastSeller!==i.sellerName) ? (
                  this.printSeller(i)
                ) : (
                  this.printProduct(i)
                )
              ))}
            </li>
            <li className="list-group-item">
              <div className="container">
                <div className="row">
                  <div className="col-sm-4">VAT: CC {round((order.VAT/100)*order.net)} ~ {round(order.VAT)}%</div>
                  <div className="col-sm-4">Net Price: CC {round(order.net)}</div>
                  <div className="col-sm-4"><strong>Total Price: CC {round(orderCost)}</strong></div>
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
    if(!(checkCitizen()||checkBusiness())){window.location.href = "/"}
    let { ordersList } = this.props;
    let totalOrders = ordersList.length
    return (
      <div>
        <NavBar />
        <h3>ORDERS</h3>
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
