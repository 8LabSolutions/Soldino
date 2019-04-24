/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {Component} from 'react';
import { round } from '../../auxiliaryFunctions';

class FormCubitManager extends Component {

  constructor(props){
    super(props);

    this.state = {
      amount: null,
      address: null
    }

    //bindings
    this.handleMint = this.handleMint.bind(this);
    this.handleDistribute = this.handleDistribute.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount(){
    let {getBalanceAndTotalAmount} = this.props;
    getBalanceAndTotalAmount();
  }

  handleChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  handleMint(e){
    e.preventDefault();
    let {mint} = this.props;
    let {amount} = this.state;
    mint(amount);
  }

  handleDistribute(e){
    e.preventDefault();
    let {distribute} = this.props;
    let {amount, address} = this.state;
    distribute(amount, address);
  }


  render() {
    let {totalSupply, governmentSupply} = this.props;
    return (
      <form>
        <div>
          <div className="col-sm-6 top-2rem">
            <p>Total supply: {round(totalSupply)} CC</p>
          </div>
          <div className="col-sm-6 top-2rem">
            <p>Government supply: {round(governmentSupply)} CC</p>
          </div>
        </div>

        <div className="container">
          <div className="row">

            <div className="form-group col-sm-6">
              <label htmlFor="InputAmount">Amount</label>
              <input className="form-control" id="amount" name="amount" placeholder="Enter amount" type="number" min="1" max={governmentSupply} onChange={this.handleChange} />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="InputAddress">Address</label>
              <input className="form-control" id="address" name="address" placeholder="Enter address" onChange={this.handleChange} />
            </div>
            <div className="col-sm-6 text-center">
              <button type="button" className="btn btn-light" onClick={this.handleMint}>Mint</button>
            </div>
            <div className="col-sm-6 text-center">
              <button type="button" className="btn btn-light" onClick={this.handleDistribute}>Distribute</button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default FormCubitManager;
