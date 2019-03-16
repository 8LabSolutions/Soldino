/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {Component} from 'react';
import Button from './Button'

class FormRegistration extends Component {
  render() {
    return (
      <form>
        <div className="container">
          <div className="row">
{/* START - User type switch buttons */}
            <div className="col-sm-12">
              {/*<div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Business</button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <button className="dropdown-item" type="button">Citizen</button>
                  <button className="dropdown-item" type="button">Business</button>
                </div>
              </div>*/}
              <input type="radio" name="userType" /> Business
              <br />
              <input type="radio" name="userType" defaultChecked="checked" /> Citizen
            </div>
{/* END - User type switch buttons */}
{/* START - Dynamic form based on user type */}
            <div className="form-group col-sm-6">
              <label htmlFor="InputName">Name</label>
              <input type="email" className="form-control" id="InputName" aria-describedby="emailHelp" placeholder="Enter name" />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="InputVAT">VAT Number</label>
              <input className="form-control" id="InputVAT" placeholder="Enter VAT number" />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="InputEmail">Email</label>
              <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" className="form-text text-muted">We will never share your email with anyone else.</small>
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="InputAddress">Address</label>
              <input className="form-control" id="InputAddress" placeholder="Enter address" />
            </div>
{/* END - Dynamic form based on user type */}
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