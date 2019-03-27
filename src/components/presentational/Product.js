/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import ButtonProduct from '../containers/ButtonProduct';

class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {value: 1};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    let props = this.props;
    let maxQuantity = 50;
    let product = []
    product[3] = props.VAT
    return (
      <div className="col-sm-3">
        <div className="card">
          {/* <img src="..." className="card-img-top" alt="..." /> */}
          <div className="card-body">
            <h5 className="card-title">{ product[0] = props.title }</h5>
            <h6 className="card-price">CC { product[2] = props.price }</h6>
            {/*gross price*/}
            <p className="card-text">{props.description}</p>
            <div className="form-group col-sm-12">
              <label htmlFor="InputQuantity">Quantity</label>
              <input className="form-control" id="InputQuantity" value={product[1] = this.state.value} onChange={this.handleChange} placeholder="Enter quantity" type="number" min="1" max={maxQuantity} />
            </div>
            <NavLink className="nav-item nav-link" to="/">
              {console.log(product)}
              <ButtonProduct text="Add to cart" args1={product} />
            </NavLink>  
          </div>
        </div>
        <br />
      </div>
    )
  }
}

export default Product;
