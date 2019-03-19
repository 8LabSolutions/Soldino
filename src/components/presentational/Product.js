/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, {Component} from 'react';
import Button from './Button';


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
            <h6 className="card-price">{props.price}</h6>
            {/*gross price*/}
            <p className="card-text">{props.description}</p>
            <div className="form-group col-sm-12">
              <label htmlFor="InputQuantity">Quantity</label>
              <input className="form-control" id="InputQuantity" placeholder="Enter quantity" defaultValue="1" type="number" min="1" max={maxQuantity} />
            </div>
            <Button text="Add to cart" />
          </div>
        </div>
        <br />
      </div>
    )
  }
}

export default Product;
