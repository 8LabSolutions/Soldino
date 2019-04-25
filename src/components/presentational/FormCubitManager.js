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
        <div className="container">
          <div className="row">
            <div className="col-sm-6 top-2rem">
              <p>Total supply: {round(totalSupply)} CC</p>
            </div>
            <div className="col-sm-6 top-2rem">
              <p>Government supply: {round(governmentSupply)} CC</p>
            </div>
            <div className="form-group col-sm-6 top-2rem">
              <label htmlFor="InputAmount">Amount</label>
              <input className="form-control" id="InputAmount" name="InputAmount" placeholder="Enter amount" type="number" min="1" max={governmentSupply} onChange={this.handleChange} />
            </div>
            <div className="form-group col-sm-6 top-2rem">
              <label htmlFor="InputAddress">Address</label>
              <input className="form-control" id="InputAddress" name="InputAddress" placeholder="Enter address" onChange={this.handleChange} />
            </div>
            <div className="col-sm-12 text-center">
              <button type="button" className="btn btn-light" onClick={this.handleDistribute}>Distribute</button>
            </div>
            <div className="col-sm-12 top-2rem"><hr /></div>
            <div className="form-group col-sm-6 offset-sm-3 top-2rem">
              <label htmlFor="InputAmount2">Amount</label>
              <input className="form-control" id="InputAmount2" name="InputAmount2" placeholder="Enter amount" type="number" min="1" onChange={this.handleChange} />
            </div>
            <div className="col-sm-12 text-center">
              <button type="button" className="btn btn-light" onClick={this.handleMint}>Mint</button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default FormCubitManager;
