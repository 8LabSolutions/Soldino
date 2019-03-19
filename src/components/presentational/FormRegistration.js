import React, {Component} from 'react';
import Button from './Button';
import Guide from './Guide';

function citizenFormMaker() {
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

function businessFormMaker() {
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

class FormRegistration extends Component {
  constructor(props) {
    super(props);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.state = { userType: "CITIZEN" };
  }

  handleOptionChange(event){
    this.setState({
      userType: event.target.value
    });
  }

  render() {
    const { userType } = this.state;
    return (
      <form>
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <Guide />
              <a href="https://metamask.io">Install MetaMask</a>
            </div>
            <div className="col-sm-6">
              <div className="col-sm-12" onChange={this.handleOptionChange}>
                <label htmlFor="businessRadio">
                  <input type="radio" name="userType" value="BUSINESS" id="businessRadio" />
                  <span>Business</span>
                </label>
                <br />
                <label htmlFor="citizenRadio">
                  <input type="radio" name="userType" defaultChecked="checked" value="CITIZEN" id="citizenRadio" />
                  <span>Citizen</span>
                </label>
              </div>
              { userType==="CITIZEN" ? citizenFormMaker() : businessFormMaker() }
              <div className="col-sm-12 text-center">
                <Button text="Sign Up" />
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
