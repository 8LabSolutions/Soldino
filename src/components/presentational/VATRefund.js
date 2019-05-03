/* eslint-disable react/jsx-one-expression-per-line */
import React, {Component} from 'react';
import NavBar from './NavBar'
import { checkGovernment } from '../../auxiliaryFunctions';
import SearchContainer from '../containers/SearchContainer';

class VATRefund extends Component {
  printBusiness(business) {
    let refundButtonClasses = null;
    let rowColor = null;
    switch(business.paymentStatus){
      case "payed":
        refundButtonClasses = "btn btn-light disabled"
        rowColor = "list-group-item userlist-item greenRow"
      break;
      case "deferred":
      case "paying":
        refundButtonClasses = "btn btn-light disabled"
        rowColor = "list-group-item userlist-item yellowRow"
      break;
      case "waiting":
        refundButtonClasses = "btn btn-light"
        rowColor = "list-group-item userlist-item yellowRow"
      break;
      case "late":
        refundButtonClasses = "btn btn-light disabled"
        rowColor = "list-group-item userlist-item redRow"
      break;
    }
    return (
      <li className={rowColor}>
        <div className="container">
          <div className="row">
            <div className="col-sm-2 offset-sm-1 itemVAT">
              <span className="customCursor">{business.name}</span>
            </div>
            <div className="col-sm-2 itemVAT">
              <span className="customCursor">{business.VATnumber}</span>
            </div>
            <div className="col-sm-2 itemVAT">
              <span className="customCursor">{business.paymentStatus}</span>
            </div>
            <div className="col-sm-2 itemVAT">
              <span className="customCursor">{business.amount}</span>
            </div>
            <div className="col-sm-2 itemVAT">
              <button type="button" className={refundButtonClasses} onClick={() => {console.log(business.address)}}>Refund</button>
            </div>
          </div>
        </div>
      </li>
    )
  }

  render() {
    if(checkGovernment()===false){window.location.href = "/"}
    let businessArray = []
    businessArray = [
      {name: "Azienda 1", VATnumber: "54623102359", paymentStatus: "payed", amount: 382.14, address: "address"},
      {name: "Azienda 2", VATnumber: "54210567953", paymentStatus: "deferred", amount: 24.50, address: "address"},
      {name: "Azienda 3", VATnumber: "97652134056", paymentStatus: "paying", amount: 576.2, address: "address"},
      {name: "Azienda 4", VATnumber: "54615064254", paymentStatus: "waiting", amount: 542.23, address: "address"},
      {name: "Azienda 5", VATnumber: "97845160506", paymentStatus: "late", amount: 95.6, address: "address"}
    ];
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-sm-12 userlist-margin">
              <SearchContainer />

              <ul className="list-group">
                <li className="list-group-item">
                  <div className="container">
                    <div className="row">
                      <div className="col-sm-2 offset-sm-1 itemVAT">
                        <p className="customCursor">Name</p>
                      </div>
                      <div className="col-sm-2 itemVAT">
                        <p className="customCursor">VAT Number</p>
                      </div>
                      <div className="col-sm-2 itemVAT">
                        <p className="customCursor">Status</p>
                      </div>
                      <div className="col-sm-2 itemVAT">
                        <p className="customCursor">Amount</p>
                      </div>
                      <div className="col-sm-2 itemVAT">
                        {/*<button type="button" className="btn btn-light" onClick={() => console.log("REFUND")}>Refund</button>*/}
                      </div>
                    </div>
                  </div>
                </li>
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
