/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import ButtonCart from '../containers/ButtonCart'
import Button from './Button'
import ButtonCartRemove from '../containers/ButtonCartRemove';
import ButtonCartAdd from '../containers/ButtonCartAdd';

function enableRemove(title, quantity, price) {
  return (
    <NavLink className="nav-item nav-link" to="/cart"><ButtonCartRemove text="-" args1={title} args2={quantity} args3={price} /></NavLink>  
  )
}

function disableRemove() {
  return (
    <NavLink className="nav-item nav-link" to="/cart"><Button text="-" /></NavLink>
  )
}

class Product extends Component {
  render() {
    let props = this.props;
    return (
      <div className="col-sm-4">
        <div className="card">
          <div className="card-body">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <h5 className="card-title">{props.title}</h5>
                </div>
                <div className="col-sm-4">
                  { props.quantity<="1" ? disableRemove() : enableRemove(props.title, props.quantity-1, props.price) }
                </div>
                <div className="col-sm-4">
                  <h6 className="card-quantity">{props.quantity}</h6>
                </div>
                <div className="col-sm-4">
                  <NavLink className="nav-item nav-link" to="/cart"><ButtonCartAdd text="+" args1={props.title} args2={props.quantity+1} args3={props.price} /></NavLink>  
                </div>
                <div className="col-sm-12">
                  <h5 className="card-price">CC {props.price}</h5>
                </div>
                <div className="col-sm-12">
                  <NavLink className="nav-item nav-link" to="/cart"><ButtonCart text="Remove" args1={props.title} args2={props.quantity} args3={props.price} /></NavLink>  
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

export default Product;
