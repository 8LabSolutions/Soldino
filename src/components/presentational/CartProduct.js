/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, {Component} from 'react';
import Button from './Button';



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
                  <Button text="-" />
                </div>
                <div className="col-sm-4">
                  <h6 className="card-quantity">{props.quantity}</h6>
                </div>
                <div className="col-sm-4">
                  <Button text="+" />
                </div>
                <div className="col-sm-12">
                  <h5 className="card-price">CC {props.price}</h5>
                </div>
                <div className="col-sm-12">
                  <Button text="Remove" />
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
