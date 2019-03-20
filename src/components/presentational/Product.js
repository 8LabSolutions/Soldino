/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, {Component} from 'react';
import ButtonProduct from '../containers/ButtonProduct';


class Product extends Component {
  render() {
    let props = this.props;
    let maxQuantity = 50;
    return (
      <div className="col-sm-4">
        <div className="card">
          {/* <img src="..." className="card-img-top" alt="..." /> */}
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <h6 className="card-price">CC {props.price}</h6>
            {/*gross price*/}
            <p className="card-text">{props.description}</p>
            <div className="form-group col-sm-12">
              <label htmlFor="InputQuantity">Quantity</label>
              <input className="form-control" id="InputQuantity" placeholder="Enter quantity" defaultValue="1" type="number" min="1" max={maxQuantity} />
            </div>
            <ButtonProduct text="Add to cart" args1={props.title} args2="1" args3={props.price} />
          </div>
        </div>
        <br />
      </div>
    )
  }
}

export default Product;
