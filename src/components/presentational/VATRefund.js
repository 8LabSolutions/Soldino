/* eslint-disable react/jsx-one-expression-per-line */
import React, {Component} from 'react';
import NavBar from './NavBar'
import { checkGovernment, periodToDate, dateToPeriod } from '../../auxiliaryFunctions';
import SearchContainer from '../containers/SearchContainer';
import { businessStatus } from '../../constants/fixedValues';

class VATRefund extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    let {resetSearch, setStatus, resetPeriod, getVATPeriods, resetVAT} = this.props;
    resetSearch();
    resetPeriod();
    resetVAT();
    setStatus("");
    getVATPeriods();
    //setVATRefund();
  }

  handleChange(event, type){
    let {setStatus} = this.props;
    let {setPeriod} = this.props;
    let {resetPeriod} = this.props;
    (type==="status")
      ? (event.target.value==="Select a status") ? setStatus("") : setStatus(event.target.value)
      : (event.target.value==="Select a quarter") ? resetPeriod() : setPeriod({id: dateToPeriod(event.target.value), amount: null, payable: false})
  }

  printBusiness(business) {
    let refundButtonClasses = null;
    let rowColor = null;
    let { refund, selectedPeriod } = this.props;

    switch(business.paymentStatus){
      case businessStatus.payed:
        refundButtonClasses = "btn btn-light disabled"
        rowColor = "list-group-item userlist-item greenRow"
      break;
      case businessStatus.deferred:
      case businessStatus.paying:
        refundButtonClasses = "btn btn-light disabled"
        rowColor = "list-group-item userlist-item yellowRow"
      break;
      case businessStatus.waiting:
        refundButtonClasses = "btn btn-light"
        rowColor = "list-group-item userlist-item yellowRow"
      break;
      case businessStatus.late:
        refundButtonClasses = "btn btn-light disabled"
        rowColor = "list-group-item userlist-item redRow"
      break;
    }
    return (
      <li className={rowColor} key={business.address+business.amount}>
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
              {(business.amount<0) ? <span className="customCursor">{-1*business.amount}</span> : <span className="customCursor">{business.amount}</span>}
            </div>
            <div className="col-sm-2 itemVAT">
              <button type="button" className={refundButtonClasses} onClick={() => {refund(business.address, selectedPeriod.id, business.amount*(-1))}}>Refund</button>
            </div>
          </div>
        </div>
      </li>
    )
  }

  render() {
    if(checkGovernment()===false){window.location.href = "/"}
    let {VATRefundList, VATPeriods, searchProduct, selectedStatus } = this.props;
    let list = [];
    let pushed = false;
    if(VATRefundList!== undefined && VATRefundList.length>0){
      for(let i=0; i< VATRefundList.length; i++){
        if(VATRefundList[i].paymentStatus.includes(selectedStatus)){
          pushed = false
          if(VATRefundList[i].name.toUpperCase().includes(searchProduct.toUpperCase()) && pushed===false){
            list = [...list, VATRefundList[i]];
            pushed = true
          }
          if(VATRefundList[i].VATnumber.toUpperCase().includes(searchProduct.toUpperCase()) && pushed===false){
            list = [...list, VATRefundList[i]];
            pushed = true
          }
          if(VATRefundList[i].address.toUpperCase().includes(searchProduct.toUpperCase()) && pushed===false){
            list = [...list, VATRefundList[i]];
            pushed = true
          }
        }
      }
    }
    return (
      <div>
        <NavBar />
        <h3>VAT REFUND</h3>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="container">
                <div className="row">
                  <div className="col-sm-6">
                    <SearchContainer />
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <select className="form-control" id="exampleFormControlSelect1" onChange={(event) => {this.handleChange(event, "status")}}>
                        <option>Select a status</option>
                        <option>{businessStatus.deferred}</option>
                        <option>{businessStatus.late}</option>
                        <option>{businessStatus.payed}</option>
                        <option>{businessStatus.paying}</option>
                        <option>{businessStatus.waiting}</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <select className="form-control" id="exampleFormControlSelect2" onChange={(event) => {this.handleChange(event, "period")}}>
                        <option>Select a period</option>
                        {VATPeriods.map((i) => <option key={i}>{periodToDate(i)}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
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
                      <div className="col-sm-2 itemVAT" />
                    </div>
                  </div>
                </li>
                {list.map(i => this.printBusiness(i))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VATRefund;
