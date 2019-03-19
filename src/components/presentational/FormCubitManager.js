/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {Component} from 'react';
import Button from './Button'

class FormCubitManager extends Component {
  render() {
    let totalSupply = 1500000;
    let governSupply = 9000;
    return (
      <form>
        <div className="container">
          <div className="row">
            <div className="form-group col-sm-6">
              <p>Total supply: {totalSupply} CC</p>
            </div>
            <div className="form-group col-sm-6">
              <p>Government supply: {governSupply} CC</p>
            </div>
            <div className="form-group col-sm-6">
              <label for="InputAmount">Amount</label>
              <input className="form-control" id="InputAmount" placeholder="Enter amount" type="number" min="1" max={governSupply} />
            </div>
            <div className="form-group col-sm-6">
              <label for="InputAddress">Address</label>
              <input className="form-control" id="InputAddress" placeholder="Enter address" />
            </div>
            <div class="col-sm-6 text-center">
              <Button text="Mint" />
            </div>
            <div class="col-sm-6 text-center">
              <Button text="Distribute" />
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default FormCubitManager;