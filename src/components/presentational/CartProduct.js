/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import ButtonCart from '../containers/ButtonCart'
import ButtonCartRemove from '../containers/ButtonCartRemove';
import ButtonCartAdd from '../containers/ButtonCartAdd';
import { round } from '../../auxiliaryFunctions';


class CartProduct extends Component {
  enableRemove(title, quantity, price, VAT, sellerName, sellerVATNumber, keyProd) {
    let product = [title, quantity, price, VAT, sellerName, sellerVATNumber, keyProd]
    return (
      <NavLink className="nav-item nav-link" to="/cart"><ButtonCartRemove text="-" args1={product} /></NavLink>
    )
  }
  disableRemove() {
    return (
      <NavLink className="nav-item nav-link" to="/cart"><button type="button" className="btn btn-light" disabled>-</button></NavLink>
    )
  }
  render() {
    let props = this.props;
    console.log("RENDER PRODOTTO NEL CARRELLO")
    console.log(props)
    let product = [props.title, props.quantity, props.price, props.VAT, props.sellerName, props.sellerVATNumber, props.keyProd]
    return (
      <div className="col-sm-4">
        <div className="card card-cart">
          <div className="card-body">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <h5 className="card-title">{props.title}</h5>
                </div>
                <div className="col-sm-4">
                  { props.quantity<="1" ? this.disableRemove() : this.enableRemove(props.title, +props.quantity-1, props.price, props.VAT, props.sellerName, props.sellerVATNumber, props.keyProd) }
                </div>
                <div className="col-sm-4">
                  <h6 className="card-quantity">{props.quantity}</h6>
                </div>
                <div className="col-sm-4">
                  <NavLink className="nav-item nav-link" to="/cart"><ButtonCartAdd text="+" args1={product} /></NavLink>
                </div>
                <div className="col-sm-12">
                  <h5 className="card-price">CC {round(props.price)}</h5>
                </div>
                <div className="col-sm-12">
                  <NavLink className="nav-item nav-link" to="/cart"><ButtonCart text="Remove" args1={product} /></NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    )
  }
}

export default CartProduct;
