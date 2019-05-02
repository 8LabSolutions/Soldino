/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
import React, {Component} from 'react';
import jsPDF from 'jspdf';
import NavBar from './NavBar'
import { printDate, ExportPDF, checkBusiness, round, printShipment } from '../../auxiliaryFunctions/index'
import ButtonGeneric from '../containers/ButtonGeneric';


class TransactionsManager extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount(){
    const {/*getInvoices, */getBusinessPeriods} = this.props;
    //getInvoices(null)
    getBusinessPeriods();
  }

  downloadPDF() {
    var doc = new jsPDF()
    doc.fromHTML(ExportPDF(this.props.invoices, this.selectedQuarter) , 1, 1)
    return(
      doc.save("invoices "+this.selectedQuarter+".pdf")
    )
  }

  printQuarters(quarter) {
    return(
      <option>{quarter.id}</option>
    )
  }

  handleChange(event){
    const {getInvoices} = this.props;
    getInvoices(event.target.value)
    let {selectPeriod} = this.props;
    selectPeriod(event.target.value)
  }

  nextQuarter() {
    let {selectedPeriod} = this.props;
    let next = ''
    if(selectedPeriod.id[5]==='4'){
      next = parseInt(selectedPeriod.id.substring(0, 4))+1
      next += "-1"
    }else{
      next = selectedPeriod.id.substring(0, 5)+(parseInt(selectedPeriod.id.substring(5, 6))+1)
    }
    return next;
  }

  printDeferredPayment() {
    let {putOnHoldVATPeriod} = this.props;
    let {selectedPeriod} = this.props;
    return(
      <div className="modal fade" id="deferred" tabIndex="-1" role="dialog" aria-labelledby="deferredLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deferredLabel">Deferred Payment</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">The payment will be deferred for three months.<br />You have to pay the debt by {this.nextQuarter()}.</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-light" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-light" data-dismiss="modal" onClick={()=>{putOnHoldVATPeriod(selectedPeriod.id)}}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  printDebitButtons() {
    let {selectedPeriod} = this.props;
    let {payVATPeriod} = this.props;
    return(
      <div className="col-sm-6">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <button type="button" className="btn btn-light" onClick={()=>{payVATPeriod(selectedPeriod.id)}}>Instant Payment</button>
            </div>
            {(selectedPeriod.defereable===true) ? (
              <div className="col-sm-6">
                <button type="button" className="btn btn-light" data-toggle="modal" data-target="#deferred">Deferred Payment</button>
              </div>
            ): (
              <div className="col-sm-6">
                <button type="button" className="btn btn-light disabled">Deferred Payment</button>
              </div>
            )}
          </div>
        </div>
        {(selectedPeriod.defereable===true) ? this.printDeferredPayment() : null}
      </div>
    )
  }

  printStatus() {
    let {selectedPeriod} = this.props
    if(selectedPeriod.amount!==null){
      if(selectedPeriod.amount<0) {
        return(
          <p>VAT status for the selected quarter: <span className="green">{-1*selectedPeriod.amount} CC</span></p>
        )
      }else{
        return(
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <p>VAT status for the selected quarter: <span className="red">{-1*selectedPeriod.amount} CC</span></p>
              </div>
              {(selectedPeriod.payable===true) ? this.printDebitButtons() : null}
            </div>
          </div>
        )
      }
    }
  }

  printInvoices() {
    console.log(this.props.invoices)
    let {myVATnumber} = this.props;
    return(
      <ul className="list-group">
        <li className="list-group-item">
          <div className="container">
            <div className="row">
              <div className="col-sm-2">
                <p>Number</p>
              </div>
              <div className="col-sm-2">
                <p>Type</p>
              </div>
              <div className="col-sm-2">
                <p>Date</p>
              </div>
              <div className="col-sm-2">
                <p>Total Price</p>
              </div>
              <div className="col-sm-2">
                <p>Total VAT</p>
              </div>
              <div className="col-sm-2">
                {/*<ButtonGeneric text="Download PDF" />*/}
                <button type="button" className="btn btn-light" onClick={() => this.downloadPDF()}>Download PDF</button>
              </div>
            </div>
          </div>
        </li>
        {this.props.invoices.map(i => {
          return(
            <div key={i.number}>
              <li className="list-group-item">
                <div className="container">
                  <div className="row">
                    <div className="col-sm-2">
                      <p>Invoice #{i.number}</p>
                    </div>
                    <div className="col-sm-2">
                      {(i.sellerVATNumber===myVATnumber) ? <p>Sale</p> : <p>Purchase</p>} {/* if seller === logged user then "sale" else "purchase" */}
                    </div>
                    <div className="col-sm-2">
                      <p>{printDate(i.date)}</p>
                    </div>
                    <div className="col-sm-2">
                      <p>CC {round((+(i.VAT/100)*i.net)+ +i.net)}</p>
                    </div>
                    <div className="col-sm-2">
                      <p>CC {round((i.VAT/100)*i.net)}</p>
                    </div>
                    <div className="col-sm-2">
                      <button type="button" className="btn btn-light" data-toggle="modal" data-target={"#invoice"+i.number}>More details</button>
                    </div>
                  </div>
                </div>
              </li>


              <div className="modal fade" id={"invoice"+i.number} tabIndex="-1" role="dialog" aria-labelledby={"invoice"+i.number+"Label"} aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id={"invoice"+i.number+"Label"}>Invoice #{i.number}</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="container">
                        <div className="row">
                          <div className="col-sm-4">
                            <p>Date: </p>
                          </div>
                          <div className="col-sm-8">
                            <p>{printDate(i.date)}</p>
                          </div>
                          <div className="col-sm-4">
                            <p>Order date: </p>
                          </div>
                          <div className="col-sm-8">
                            <p>{printDate(i.date)}</p>
                          </div>
                          <div className="col-sm-4">
                            <p>Order number: </p>
                          </div>
                          <div className="col-sm-8">
                            <p>{i.number}</p>
                          </div>
                          <div className="col-sm-12">
                            <p>Products: </p>
                          </div>
                          <div className="col-sm-12"><hr /></div>
                          {i.products.map(j => {
                            return(
                              <div key="j" className="col-sm-10 offset-sm-1">
                                <div className="container">
                                  <div className="row">
                                    <div className="col-sm-4">
                                      <p>Product: </p>
                                    </div>
                                    <div className="col-sm-8">
                                      <p>{j.title}</p>
                                    </div>
                                    <div className="col-sm-4">
                                      <p>Total Price: </p>
                                    </div>
                                    <div className="col-sm-8">
                                      <p>CC {round(j.price*j.quantity)}</p>
                                    </div>
                                    <div className="col-sm-4">
                                      <p>Net Price: </p>
                                    </div>
                                    <div className="col-sm-8">
                                      <p>CC {round(((j.price*100)/(+j.VAT + +100))*j.quantity)}</p>
                                    </div>
                                    <div className="col-sm-4">
                                      <p>VAT %: </p>
                                    </div>
                                    <div className="col-sm-8">
                                      <p>{j.VAT}</p>
                                    </div>
                                    <div className="col-sm-4">
                                      <p>Description: </p>
                                    </div>
                                    <div className="col-sm-8 modal-description">
                                      <p>{j.description}</p>
                                    </div>
                                    <div className="col-sm-4">
                                      <p>Quantity: </p>
                                    </div>
                                    <div className="col-sm-8">
                                      <p>{j.quantity}</p>
                                    </div>
                                    <div className="col-sm-12"><hr /></div>
                                  </div>
                                </div>
                              </div>

                            )
                          })}
                          <div className="col-sm-4">
                            <p>Total VAT: CC </p>
                          </div>
                          <div className="col-sm-8">
                            <p>{round((i.VAT/100)*i.net)}</p>
                          </div>
                          <div className="col-sm-4">
                            <p>Total Price: CC </p>
                          </div>
                          <div className="col-sm-8">
                            <p>{round((+(i.VAT/100)*i.net)+ +i.net)}</p>
                          </div>
                          <div className="col-sm-4">
                            <p>Seller: </p>
                          </div>
                          <div className="col-sm-8">
                            <p>{i.sellerName} {i.sellerVATNumber}</p>
                          </div>
                          <div className="col-sm-4">
                            <p>Buyer: </p>
                          </div>
                          <div className="col-sm-8">
                            <p>{i.buyerName} {i.buyerDetails}</p>
                          </div>
                          <div className="col-sm-4">
                            <p>Shipment: </p>
                          </div>
                          <div className="col-sm-8">
                            <p>{printShipment(i.address)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-light" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </ul>
    )
  }

  render() {
    if(checkBusiness()===false){window.location.href = "/"}
    let {periods} = this.props;
    var list = []
    list = periods.map(quarter => this.printQuarters(quarter))
    return (
      <div>
        <NavBar />
        <h3>Transactions Manager</h3>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="container">
                <div className="row">
                  <div className="col-sm-6 offset-sm-3">
                    <div className="form-group">
                      <select className="form-control" id="exampleFormControlSelect1" onChange={this.handleChange}>
                        {list}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              { this.printStatus() }
              <br />
              { (this.props.invoices!==null) ? this.printInvoices() : null }


            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default TransactionsManager;
