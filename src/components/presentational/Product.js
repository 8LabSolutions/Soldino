/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import ButtonProduct from '../containers/ButtonProduct';
import { round } from '../../auxiliaryFunctions';
import { userInfo } from 'os';
import { store } from '../../store';

class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {value: 1};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  printNotAllowed() {
    return (
      <p id="notAllowed">You are not allowed to buy your products.</p>
    )
  }

  render() {
    let props = this.props;
    let maxQuantity = 50;
    let product = []
    product[2] = props.price
    product[3] = props.VAT
    product[4] = props.sellerName
    product[5] = props.sellerVATNumber
    product[6] = props.keyProd
    product[7] = props.seller
    product[8] = props.description
    let image
    let myVAT
    let classDiv
    {(store.getState().user.VATnumber!==undefined) ? myVAT=store.getState().user.VATnumber : myVAT=""}
    {(props.image===null) ? image = "/default.png" : image = props.image;}
    {(props.sellerVATNumber===myVAT) ? classDiv="card productOverlay" : classDiv="card" }
    return (
      <div className="col-sm-3">
        <div className={classDiv}>
          {(props.sellerVATNumber===myVAT) ? this.printNotAllowed() : null}
          <img src={image} alt="product" />
          <div className="card-body">
            <div className="cardHeaderWrapper">
              <h5 className="card-title">{ product[0] = props.title }</h5>
              <p className="card-text">{props.description}</p>
            </div>
            <h6 className="card-price">CC { round(props.price) }</h6>
            <div className="form-group col-sm-12">
              <label htmlFor="InputQuantity">Quantity</label>
              <input className="form-control" id="InputQuantity" value={product[1] = this.state.value} onChange={this.handleChange} placeholder="Enter quantity" type="number" min="1" max={maxQuantity} />
            </div>
            <NavLink className="nav-item nav-link" to="/">
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
