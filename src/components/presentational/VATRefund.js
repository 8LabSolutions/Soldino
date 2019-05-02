/* eslint-disable react/jsx-one-expression-per-line */
import React, {Component} from 'react';
import NavBar from './NavBar'
import ButtonGeneric from '../containers/ButtonGeneric';
import { checkGovernment, round } from '../../auxiliaryFunctions';
import SearchContainer from '../containers/SearchContainer';

class VATRefund extends Component {
  printBusiness(business) {
    if(business[2] !== "await refund"){ //check payment status
      return (
        <li className="list-group-item userlist-item">
          <strong className="customCursor">Company name: </strong><span className="customCursor">{business[0]}</span><br />
          <strong className="customCursor">VAT number: </strong><span className="customCursor">{business[1]}</span><br />
          <strong className="customCursor">Payment status: </strong><span className="customCursor">{business[2]}</span><br />
          <strong className="customCursor">Balance: </strong><span className="customCursor">{round(business[3])}</span><br />
        </li>
      )
    }else{
      return (
        <li className="list-group-item userlist-item">
          <strong className="customCursor">Company name: </strong><span className="customCursor">{business[0]}</span><br />
          <strong className="customCursor">VAT number: </strong><span className="customCursor">{business[1]}</span><br />
          <strong className="customCursor">Payment status: </strong><span className="customCursor">{business[2]}</span><br />
          <strong className="customCursor">Balance: </strong><span className="customCursor">{round(business[3])}</span><br />
          <ButtonGeneric text="Refund" />
        </li>
      )
    }
  }

  render() {
    if(checkGovernment()===false){window.location.href = "/"}
    //need to check if user type is government, else redirect to home like previous line
    let totalBusiness = 15
    let name
    let vatNumber
    let paymentStatus
    let balance
    let business
    let businessArray = []
    for(var i=0; i<totalBusiness; i++){
      name = "Company name"
      vatNumber = "VAT"
      paymentStatus = "await refund"
      balance = 999
      business = [name, vatNumber, paymentStatus, balance]
      businessArray[i] = business;
    }

    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-sm-12 userlist-margin">
              <SearchContainer />
              <ul className="list-group list-group-flush">
                {businessArray.map(i => this.printBusiness(i))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VATRefund;
