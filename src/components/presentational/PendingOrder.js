/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import ButtonGeneric from '../containers/ButtonGeneric';

class PendingOrder extends Component {
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
                <div className="col-sm-12">
                  <h6 className="card-quantity">{props.quantity}</h6>
                </div>
                <div className="col-sm-12">
                  <h5 className="card-price">CC {props.price}</h5>
                </div>
                <div className="col-sm-12">
                  <NavLink className="nav-item nav-link" to="/purchasesconfirmation"><ButtonGeneric text="Reject" /></NavLink>  
                </div>
                <div className="col-sm-12">
                  <NavLink className="nav-item nav-link" to="/purchasesconfirmation"><ButtonGeneric text="Approve" /></NavLink>  
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

export default PendingOrder;
