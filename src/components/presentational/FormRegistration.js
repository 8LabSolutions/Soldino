import React, {Component} from 'react';
import Button from './Button';

function citizenFormMaker() {
  return (
    <div className="col-sm-12">
      <label htmlFor="InputEmail" className="form-group col-sm-6"> 
        <span>Email</span>
        <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter Email" />
      </label>
      <label htmlFor="InputAddress" className="form-group col-sm-6"> 
        <span>Address</span>
        <input className="form-control" id="InputAddress" placeholder="Enter Address" />
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
      <label htmlFor="InputEmail" className="form-group col-sm-6"> 
        <span>Email</span>
        <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter Email" />
      </label>
      <label htmlFor="InputHeadquarters" className="form-group col-sm-6"> 
        <span>Headquarters</span>
        <input className="form-control" id="InputHeadquarters" placeholder="Enter Headquarters" />
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
        </div>
      </form>
    )
  }
}

export default FormRegistration;