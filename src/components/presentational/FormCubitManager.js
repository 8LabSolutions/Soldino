/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {Component} from 'react';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import { round } from '../../auxiliaryFunctions';

class FormCubitManager extends Component {
  options = [];
  constructor(props){
    super(props);

    this.state = {
      mintAmount: null,
      distributeAmount: null,
      addresses: []
    }

    //bindings
    this.handleMint = this.handleMint.bind(this);
    this.handleDistribute = this.handleDistribute.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }

  componentWillMount(){
    let {getBalanceAndTotalAmount} = this.props;
    let {getCitizenList} = this.props;
    let {getBusinessList} = this.props;
    getBalanceAndTotalAmount();
    getCitizenList()
    getBusinessList()
  }

  handleChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  handleAddressChange(list) {
    this.setState({
      addresses: list
    });
  }

  handleMint(e){
    e.preventDefault();
    let {mint} = this.props;
    let {mintAmount} = this.state;
    mint(mintAmount);
  }

  handleDistribute(e){
    e.preventDefault();
    let {distribute} = this.props;
    let {distributeAmount, addresses} = this.state;
    distribute(distributeAmount, addresses);
  }

  render() {
    let {totalSupply, governmentSupply} = this.props;
    let {citizenList} = this.props;
    let {businessList} = this.props;
    let fullList = []
    if(citizenList !== undefined){
      for(let i=0; i<citizenList.length; i++){
        fullList = [...fullList, { label: (citizenList[i].name+" "+citizenList[i].surname+" "+citizenList[i].address), value: citizenList[i].address}]
      }
    }
    if(businessList !== undefined){
      for(let i=0; i<businessList.length; i++){
        fullList = [...fullList, { label: (businessList[i].name+" "+businessList[i].VATnumber+" "+businessList[i].address), value: businessList[i].address}]
      }
    }
    this.options = fullList;
    return (
      <form>
        <h3>CUBIT MANAGER</h3>
        <div className="container">
          <div className="row">
            <div className="col-sm-6 top-2rem">
              <p>Total supply: {round(totalSupply)} CC</p>
            </div>
            <div className="col-sm-6 top-2rem">
              <p>Government supply: {round(governmentSupply)} CC</p>
            </div>
            <div className="form-group col-sm-6 offset-sm-3">
              <label htmlFor="InputAmount">Amount</label>
              <input className="form-control" id="InputAmount" name="distributeAmount" placeholder="Enter amount" type="number" min="1" max={governmentSupply} onChange={this.handleChange} />
            </div>
            <div className="form-group col-sm-6 offset-sm-3" id="inputAddressDiv">
              <label htmlFor="InputAddress">Address</label>
              <ReactMultiSelectCheckboxes className="col-sm-12" options={this.options} name="InputAddress" onChange={(list) => {this.handleAddressChange(list)}} />
            </div>
            <div className="col-sm-12 text-center">
              <button type="button" className="btn btn-light" onClick={this.handleDistribute}>Distribute</button>
            </div>
            <div className="col-sm-12 top-2rem"><hr /></div>
            <div className="form-group col-sm-6 offset-sm-3 top-2rem">
              <label htmlFor="InputAmount2">Amount</label>
              <input className="form-control" id="InputAmount2" name="mintAmount" placeholder="Enter amount" type="number" min="1" onChange={this.handleChange} />
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
