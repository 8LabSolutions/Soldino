/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
/* eslint-disable react/jsx-one-expression-per-line */
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import NavBar from './NavBar';
import ButtonGeneric from '../containers/ButtonGeneric';
import { store } from '../../store';
import ButtonCheckout from '../containers/ButtonCheckout';
import { getRegistrationAddress } from '../../auxiliaryFunctions';


class Checkout extends Component {
  constructor(props) {
    super(props);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleInput1Change = this.handleInput1Change.bind(this);
    this.handleInput2Change = this.handleInput2Change.bind(this);
    this.handleInput3Change = this.handleInput3Change.bind(this);
    this.handleInput4Change = this.handleInput4Change.bind(this);
    this.state = { shipType: "OLD", address1: "", address2: "", address3: "", address4: "" };
  }

  /* take elements from contracts(address) */
  oldShipment() {
    if(store.getState().userType==="Citizen")
    return(
      <div className="col-sm-12">
        <div className="col-sm-6 offset-sm-3">
          <input className="form-control" id="shipmentbar1" type="text" placeholder="Address" aria-label="Address" disabled />
          <br />
        </div>
        <div className="col-sm-6 offset-sm-3">
          <input className="form-control" id="shipmentbar2" type="text" placeholder="House Number" aria-label="HouseNumber" disabled />
          <br />
        </div>
        <div className="col-sm-6 offset-sm-3">
          <input className="form-control" id="shipmentbar3" type="text" placeholder="District" aria-label="District" disabled />
          <br />
        </div>
        <div className="col-sm-6 offset-sm-3">
          <input className="form-control" id="shipmentbar4" type="text" placeholder="Postcode" aria-label="Postcode" disabled />
          <br />
        </div>
      </div>
    )
    else return(
      <div className="col-sm-12">
        <div className="col-sm-6 offset-sm-3">
          <input className="form-control" id="shipmentbar1" type="text" placeholder="Headquarter" aria-label="Headquarter" disabled />
          <br />
        </div>
        <div className="col-sm-6 offset-sm-3">
          <input className="form-control" id="shipmentbar2" type="text" placeholder="Headquarter Number" aria-label="HeadquarterNumber" disabled />
          <br />
        </div>
        <div className="col-sm-6 offset-sm-3">
          <input className="form-control" id="shipmentbar3" type="text" placeholder="District" aria-label="District" disabled />
          <br />
        </div>
        <div className="col-sm-6 offset-sm-3">
          <input className="form-control" id="shipmentbar4" type="text" placeholder="Postcode" aria-label="Postcode" disabled />
          <br />
        </div>
      </div>
    )
  }
  newShipment() {
    if(store.getState().userType==="Citizen")
    return(
      <div className="col-sm-12">
        <div className="col-sm-6 offset-sm-3">
          <input className="form-control" id="shipmentbar1" type="text" placeholder="Address" aria-label="Address" value={this.state.address1} onChange={this.handleInput1Change} />
          <br />
        </div>
        <div className="col-sm-6 offset-sm-3">
          <input className="form-control" id="shipmentbar2" type="text" placeholder="House Number" aria-label="HouseNumber" value={this.state.address2} onChange={this.handleInput2Change} />
          <br />
        </div>
        <div className="col-sm-6 offset-sm-3">
          <input className="form-control" id="shipmentbar3" type="text" placeholder="District" aria-label="District" value={this.state.address3} onChange={this.handleInput3Change} />
          <br />
        </div>
        <div className="col-sm-6 offset-sm-3">
          <input className="form-control" id="shipmentbar4" type="text" placeholder="Postcode" aria-label="Postcode" value={this.state.address4} onChange={this.handleInput4Change} />
          <br />
        </div>
      </div>
    )
    else return(
      <div className="col-sm-12">
        <div className="col-sm-6 offset-sm-3">
          <input className="form-control" id="shipmentbar1" type="text" placeholder="Headquarter" aria-label="Headquarter" value={this.state.address1} onChange={this.handleInput1Change} />
          <br />
        </div>
        <div className="col-sm-6 offset-sm-3">
          <input className="form-control" id="shipmentbar2" type="text" placeholder="Headquarter Number" aria-label="HeadquarterNumber" value={this.state.address2} onChange={this.handleInput2Change} />
          <br />
        </div>
        <div className="col-sm-6 offset-sm-3">
          <input className="form-control" id="shipmentbar3" type="text" placeholder="District" aria-label="District" value={this.state.address3} onChange={this.handleInput3Change} />
          <br />
        </div>
        <div className="col-sm-6 offset-sm-3">
          <input className="form-control" id="shipmentbar4" type="text" placeholder="Postcode" aria-label="Postcode" value={this.state.address4} onChange={this.handleInput4Change} />
          <br />
        </div>
      </div>
    )
  }

  getAddress() {
    const { shipType } = this.state;
    if(shipType==="OLD"){
      return getRegistrationAddress()
    }else{  
      return(
        [
          this.state.address1,
          this.state.address2,
          this.state.address3,
          this.state.address4
        ]
      )
    }
  }

  handleOptionChange(event){
    this.setState({
      shipType: event.target.value
    });
  }
  handleInput1Change(event) {
    this.setState({
      address1: event.target.value
    });
  }
  handleInput2Change(event) {
    this.setState({
      address2: event.target.value
    });
  }
  handleInput3Change(event) {
    this.setState({
      address3: event.target.value
    });
  }
  handleInput4Change(event) {
    this.setState({
      address4: event.target.value
    });
  }
  render() {
    const { shipType } = this.state;
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h3>Checkout</h3>
              <div className="col-sm-12" onChange={this.handleOptionChange}>
                <p>Please, insert a shipment address.</p>
                <label htmlFor="ship1Radio">
                  <input type="radio" name="shipType" defaultChecked="checked" value="OLD" id="ship1Radio" />
                  <span>Use the addess inserted during registration.</span>
                </label>
                <br />
                <label htmlFor="ship2Radio">
                  <input type="radio" name="shipType" value="NEW" id="ship2Radio" />
                  <span>Use another address.</span>
                </label>
              </div>
            </div>
            { shipType==="OLD" ? this.oldShipment() : this.newShipment() }
            <div className="col-sm-6 offset-sm-3">
              <div className="container">
                <div className="row">
                  <div className="col-sm-6">
                    <NavLink className="nav-item nav-link" to="/cart"><ButtonGeneric text="Cancel" /></NavLink>
                  </div>
                  <div className="col-sm-6">
                    <NavLink className="nav-item nav-link" to="/orders">
                      <ButtonCheckout text="Confirm and pay" args1={[store.getState().cart, this.getAddress()]} />
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Checkout;