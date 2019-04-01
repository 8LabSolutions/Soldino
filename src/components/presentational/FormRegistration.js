/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import ButtonGeneric from '../containers/ButtonGeneric';
import Guide from './Guide';
import ButtonSignUp from '../containers/ButtonSignUp';

class FormRegistration extends Component {
  constructor(props) {
    super(props);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.state = { userType: "CITIZEN" };
  }

  citizenFormMaker() {
    return (
      <div className="col-sm-12">
        <label htmlFor="InputEmail" className="form-group col-sm-12">
          <span>Email</span>
          <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter Email" />
        </label>
        <label htmlFor="InputAddress" className="form-group col-sm-6">
          <span>Address</span>
          <input className="form-control" id="InputAddress" placeholder="Enter Address" />
        </label>
        <label htmlFor="HouseNumber" className="form-group col-sm-6">
          <span>House Number</span>
          <input className="form-control" id="HouseNumber" placeholder="Enter House Number" />
        </label>
        <label htmlFor="District" className="form-group col-sm-6">
          <span>District</span>
          <input className="form-control" id="District" placeholder="Enter District" />
        </label>
        <label htmlFor="Postcode" className="form-group col-sm-6">
          <span>Postcode</span>
          <input className="form-control" id="Postcode" placeholder="Enter Postcode" />
        </label>
        <label htmlFor="InputName" className="form-group col-sm-6">
          <span>Name</span>
          <input className="form-control" id="InputName" placeholder="Enter Name" />
        </label>
        <label htmlFor="InputSurname" className="form-group col-sm-6">
          <span>Surname</span>
          <input className="form-control" id="InputSurname" placeholder="Enter Surname" />
        </label>
      </div>
    )
  }

  businessFormMaker() {
    return (
      <div className="col-sm-12">
        <label htmlFor="InputEmail" className="form-group col-sm-12">
          <span>Email</span>
          <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter Email" />
        </label>
        <label htmlFor="InputHeadquarters" className="form-group col-sm-6">
          <span>Headquarter</span>
          <input className="form-control" id="InputHeadquarter" placeholder="Enter Headquarter" />
        </label>
        <label htmlFor="HeadquarterNumber" className="form-group col-sm-6">
          <span>Headquarter Number</span>
          <input className="form-control" id="HeadquarterNumber" placeholder="Enter Headquarter Number" />
        </label>
        <label htmlFor="District" className="form-group col-sm-6">
          <span>District</span>
          <input className="form-control" id="District" placeholder="Enter District" />
        </label>
        <label htmlFor="Postcode" className="form-group col-sm-6">
          <span>Postcode</span>
          <input className="form-control" id="Postcode" placeholder="Enter Postcode" />
        </label>
        <label htmlFor="InputVATNumber" className="form-group col-sm-6">
          <span>VAT Number</span>
          <input className="form-control" id="InputVATNumber" placeholder="Enter VAT Number" />
        </label>
        <label htmlFor="InputCompanyName" className="form-group col-sm-6">
          <span>Company Name</span>
          <input className="form-control" id="InputCompanyName" placeholder="Enter Company Name" />
        </label>
      </div>
    )
  }

  handleOptionChange(event){
    (event.target.checked===false ? this.setState({userType: "CITIZEN"}) : this.setState({userType: "BUSINESS"}))
  }


  render() {
    const { userType } = this.state;
    return (
      <form>
        <h3>Welcome to Soldino</h3>
        <div className="container">
          <div className="row">
            <div className="col-sm-12" onChange={this.handleOptionChange}>
              <span>Citizen</span>
              <label htmlFor="userSwitch" className="switch">
                <input type="checkbox" id="userSwitch" />
                <span className="slider" />
              </label>
              <span>Business</span>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-12">
                <span>Guide</span>
                <Guide />
              </label>
              <br />
              <a href="https://metamask.io">
                <ButtonGeneric text="Install MetaMask" />
              </a>
            </div>
            <div className="col-sm-6">
              { userType==="CITIZEN" ? this.citizenFormMaker() : this.businessFormMaker() }
              <div className="col-sm-12 text-center">
                <NavLink className="nav-item nav-link" to="/successregistration">
                  <ButtonSignUp text="Sign Up" args1={[document.getElementById("userSwitch").checked]} />
                </NavLink>
              </div>
            </div>
            {/* <div className="col-sm-12">
              <br />
              <iframe src="https://metamask.io" title="metamask" />
            </div>*/}
          </div>
        </div>
      </form>
    )
  }
}

export default FormRegistration;
