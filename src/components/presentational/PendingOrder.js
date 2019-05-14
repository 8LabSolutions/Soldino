/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, {Component} from 'react';
import { round } from '../../auxiliaryFunctions';

class PendingOrder extends Component {
  render() {
    let props = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4">{props.title}</div>
          <div className="col-sm-4">{props.quantity}</div>
          <div className="col-sm-4">CC {round(props.price)}</div>
        </div>
      </div>
    )
  }
}

export default PendingOrder;
