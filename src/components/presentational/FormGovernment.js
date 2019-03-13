/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {Component} from 'react';
import Button from './Button'

class FormGovernment extends Component {
  render() {
    return (
      <form>
        <div className="container">
          <div className="row">
            <div className="form-group col-sm-6">
              <label for="InputAmount">Amount</label>
              <input className="form-control" id="InputAmount" placeholder="Enter amount" />
            </div>
            <div className="form-group col-sm-6">
              <label for="InputAddress">Address</label>
              <input className="form-control" id="InputAddress" placeholder="Enter address" />
            </div>
            <div class="col-sm-12 text-center">
              <Button text="Mint" />
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default FormGovernment;