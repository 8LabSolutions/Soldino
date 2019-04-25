/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import ButtonBusinessProduct from '../containers/ButtonBusinessProduct';
import { round } from '../../auxiliaryFunctions';
import ButtonGeneric from '../containers/ButtonGeneric';

class BusinessProduct extends Component {

  render() {
    let props = this.props;
    let image
    (props.image===null) ? image = "/default.png" : image = props.image;
    return (
      <div className="col-sm-3">
        <div className="card card-manager">
          <img src={image} alt="product" /> 
          <div className="card-body">
            <div className="cardHeaderWrapper">
              <h5 className="card-title">{props.title}</h5>
              <p className="card-text card-description">{props.description}</p> 
            </div>
            <p className="card-text">CC {round(props.price)}</p> {/*lordo*/}
            <p className="card-text">CC {round(props.price - ((props.price * 100)/(+100 + +props.VAT)))} ~ {props.VAT}%</p>  

            <NavLink className="nav-item nav-link" to="/editproductsmanager">
              <ButtonGeneric text="Edit" args1={null} />
            </NavLink> 
            <NavLink className="nav-item nav-link" to="/productsmanager">
              <ButtonGeneric text="Remove" args1={null} />
            </NavLink>
          </div>
        </div>
        <br />
      </div>
    )
  }
}

export default BusinessProduct;
