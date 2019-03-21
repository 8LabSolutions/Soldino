/* eslint-disable react/jsx-one-expression-per-line */
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import NavBar from './NavBar';
import ButtonGeneric from '../containers/ButtonGeneric';
import { store } from '../../store';

/* take elements from contracts(address) */
function oldShipment() {
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

function newShipment() {
  if(store.getState().userType==="Citizen")
  return(
    <div className="col-sm-12">
      <div className="col-sm-6 offset-sm-3">
        <input className="form-control" id="shipmentbar1" type="text" placeholder="Address" aria-label="Address" />
        <br />
      </div>
      <div className="col-sm-6 offset-sm-3">
        <input className="form-control" id="shipmentbar2" type="text" placeholder="House Number" aria-label="HouseNumber" />
        <br />
      </div>
      <div className="col-sm-6 offset-sm-3">
        <input className="form-control" id="shipmentbar3" type="text" placeholder="District" aria-label="District" />
        <br />
      </div>
      <div className="col-sm-6 offset-sm-3">
        <input className="form-control" id="shipmentbar4" type="text" placeholder="Postcode" aria-label="Postcode" />
        <br />
      </div>
    </div>
  )
  else return(
    <div className="col-sm-12">
      <div className="col-sm-6 offset-sm-3">
        <input className="form-control" id="shipmentbar1" type="text" placeholder="Headquarter" aria-label="Headquarter" />
        <br />
      </div>
      <div className="col-sm-6 offset-sm-3">
        <input className="form-control" id="shipmentbar2" type="text" placeholder="Headquarter Number" aria-label="HeadquarterNumber" />
        <br />
      </div>
      <div className="col-sm-6 offset-sm-3">
        <input className="form-control" id="shipmentbar3" type="text" placeholder="District" aria-label="District" />
        <br />
      </div>
      <div className="col-sm-6 offset-sm-3">
        <input className="form-control" id="shipmentbar4" type="text" placeholder="Postcode" aria-label="Postcode" />
        <br />
      </div>
    </div>
  )
}


class Checkout extends Component {
  constructor(props) {
    super(props);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.state = { shipType: "OLD" };
  }

  handleOptionChange(event){
    this.setState({
      shipType: event.target.value
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
              <h1>Checkout</h1>
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
            { shipType==="OLD" ? oldShipment() : newShipment() }
            <div className="col-sm-6 offset-sm-3">
              <div className="container">
                <div className="row">
                  <div className="col-sm-6">
                    <NavLink className="nav-item nav-link" to="/cart"><ButtonGeneric text="Cancel" /></NavLink>
                  </div>
                  <div className="col-sm-6">
                    <ButtonGeneric text="Confirm and pay" />
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