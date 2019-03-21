/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, {Component} from 'react';

class PendingOrder extends Component {
  render() {
    let props = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <h5 className="card-title">{props.title}</h5>
          </div>
          <div className="col-sm-4">
            <h6 className="card-quantity">{props.quantity}</h6>
          </div>
          <div className="col-sm-4">
            <h5 className="card-price">CC {props.price}</h5>
          </div>
        </div>
      </div>
    )
  }
}

export default PendingOrder;
