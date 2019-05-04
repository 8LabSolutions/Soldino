/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {Component} from 'react';
import ButtonGeneric from '../containers/ButtonGeneric';
import Guide from './Guide';
import ButtonSignUp from '../containers/ButtonSignUp';

class FormRegistration extends Component {
  constructor(props) {
    super(props);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      userType: "CITIZEN",
      email: "",
      streetName: "",
      streetNumber: "",
      district: "",
      postCode: "",
      name: "",
      details: ""
    };
  }

  citizenFormMaker() {
    return (
      <div className="col-sm-12">
        <label htmlFor="InputEmail" className="form-group col-sm-12">
          <span>Email</span>
          <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter Email" name="email" onChange={this.handleChange} />
        </label>
        <label htmlFor="InputAddress" className="form-group col-sm-6">
          <span>Address</span>
          <input className="form-control" id="InputAddress" placeholder="Enter Address" name="streetName" onChange={this.handleChange} />
        </label>
        <label htmlFor="HouseNumber" className="form-group col-sm-6">
          <span>House Number</span>
          <input type="number" className="form-control" id="HouseNumber" name="streetNumber" placeholder="Enter House Number" onChange={this.handleChange} />
        </label>
        <label htmlFor="District" className="form-group col-sm-6">
          <span>District</span>
          <input className="form-control" id="District" name="district" placeholder="Enter District" onChange={this.handleChange} />
        </label>
        <label htmlFor="Postcode" className="form-group col-sm-6">
          <span>Postcode</span>
          <input type="number" className="form-control" id="Postcode" name="postCode" placeholder="Enter Postcode" onChange={this.handleChange} />
        </label>
        <label htmlFor="InputName" className="form-group col-sm-6">
          <span>Name</span>
          <input className="form-control" id="InputName" name="name" placeholder="Enter Name" onChange={this.handleChange} />
        </label>
        <label htmlFor="InputSurname" className="form-group col-sm-6">
          <span>Surname</span>
          <input className="form-control" id="InputSurname" name="details" placeholder="Enter Surname" onChange={this.handleChange} />
        </label>
      </div>
    )
  }

  businessFormMaker() {
    return (
      <div className="col-sm-12">
        <label htmlFor="InputEmail" className="form-group col-sm-12">
          <span>Email</span>
          <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" name="email" placeholder="Enter Email" onChange={this.handleChange}  />
        </label>
        <label htmlFor="InputHeadquarters" className="form-group col-sm-6">
          <span>Headquarter</span>
          <input className="form-control" id="InputHeadquarter" name="streetName" placeholder="Enter Headquarter" onChange={this.handleChange}  />
        </label>
        <label htmlFor="HeadquarterNumber" className="form-group col-sm-6">
          <span>Headquarter Number</span>
          <input type="number" className="form-control" id="HeadquarterNumber" name="streetNumber" placeholder="Enter Headquarter Number" onChange={this.handleChange}  />
        </label>
        <label htmlFor="District" className="form-group col-sm-6">
          <span>District</span>
          <input className="form-control" id="District" name="district" placeholder="Enter District" onChange={this.handleChange}  />
        </label>
        <label htmlFor="Postcode" className="form-group col-sm-6">
          <span>Postcode</span>
          <input type="number" className="form-control" id="Postcode" name="postCode" placeholder="Enter Postcode" onChange={this.handleChange}  />
        </label>
        <label htmlFor="InputVATNumber" className="form-group col-sm-6">
          <span>Company Name</span>
          <input className="form-control" id="InputVATNumber" name="name" placeholder="Enter Company Name" onChange={this.handleChange}  />
        </label>
        <label htmlFor="InputCompanyName" className="form-group col-sm-6">
          <span>VAT Number</span>
          <input type="number" className="form-control" id="InputCompanyName" name="details" placeholder="Enter VAT Number" onChange={this.handleChange} max={99999999999} />
        </label>
      </div>
    )
  }

  handleOptionChange(event){
    (event.target.checked===false ? this.setState({userType: "CITIZEN"}) : this.setState({userType: "BUSINESS"}))
  }

  handleChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
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
                <ButtonSignUp text="Sign Up" args1={[this.state.userType, this.state.email, this.state.streetName, this.state.streetNumber, this.state.district, this.state.postCode, this.state.name, this.state.details]} />
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
