/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
import React, {Component} from 'react';
import jsPDF from 'jspdf';
import NavBar from './NavBar'
import { store } from "../../store/index";
import { getQuarters, getVATStatus, quarterToInvoices, printDate, getDetails, ExportPDF, checkBusiness } from '../../auxiliaryFunctions/index'
import ButtonGeneric from '../containers/ButtonGeneric';


class TransactionsManager extends Component {
  quarterList  = getQuarters()
  lastQuarter = this.quarterList[0]
  selectedQuarter = this.lastQuarter
  VATstatus = getVATStatus(this.selectedQuarter)
 
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { 
      invoices: quarterToInvoices(this.lastQuarter) //initialize with last quarter ~ current quarter
    };
  }

  downloadPDF() {
    var doc = new jsPDF()
    doc.fromHTML(ExportPDF(this.state.invoices, this.selectedQuarter) , 1, 1)
    return(
      doc.save("invoices "+this.selectedQuarter+".pdf")
    )
  }

  printQuarters(quarter) {
    return(
      <option>{quarter}</option>
    )
  }

  handleChange(event){
    this.selectedQuarter = event.target.value
    let obj = quarterToInvoices(event.target.value)
    this.setState({invoices: obj})
    console.log(this.selectedQuarter)
  }
  
  printDebitButtons() {
    return(
      <div className="col-sm-6">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <ButtonGeneric text="Instant Payment" />
            </div>
            <div className="col-sm-6">
              <button type="button" className="btn btn-light" data-toggle="modal" data-target="#deferred">Deferred Payment</button>
            </div>
          </div>
        </div>

        <div className="modal fade" id="deferred" tabIndex="-1" role="dialog" aria-labelledby="deferredLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deferredLabel">Deferred Payment</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">UC 22.7</div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" data-dismiss="modal">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  printStatus() {
    if(this.VATstatus>=0) {
      return(
        <p>VAT status for the selected quarter: <span className="green">+{this.VATstatus} CC</span></p>
      )
    }else{
      return(
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <p>VAT status for the selected quarter: <span className="red">{this.VATstatus} CC</span></p>
            </div>              
            {this.printDebitButtons()}
          </div>
        </div>
      )
    }
  }

  printInvoices() {
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
        {this.state.invoices.map(i => {
          return(
            <div key={i.number}>
              <li className="list-group-item">
                <div className="container">
                  <div className="row">
                    <div className="col-sm-2">
                      <p>Invoice #{i.number}</p>
                    </div>
                    <div className="col-sm-2">
                      {(i.sellerVATNumber===getDetails()) ? <p>Sale</p> : <p>Purchase</p>} {/* if seller === logged user then "sale" else "purchase" */}
                    </div>
                    <div className="col-sm-2">
                      <p>{printDate(i.date)}</p>
                    </div>
                    <div className="col-sm-2">
                      <p>CC {i.totalCC}</p>
                    </div>
                    <div className="col-sm-2">
                      <p>CC {i.totalVAT}</p>
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
                            <p>{printDate(i.orderDate)}</p>
                          </div>
                          <div className="col-sm-4">
                            <p>Order number: </p>
                          </div>
                          <div className="col-sm-8">
                            <p>{i.orderNumber}</p>
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
                                      <p>{j[0]}</p>
                                    </div>
                                    <div className="col-sm-4">
                                      <p>Total Price: </p>
                                    </div>
                                    <div className="col-sm-8">
                                      <p>CC {j[1]}</p>
                                    </div>
                                    <div className="col-sm-4">
                                      <p>Net Price: </p>
                                    </div>
                                    <div className="col-sm-8">
                                      <p>CC {j[2]}</p>
                                    </div>
                                    <div className="col-sm-4">
                                      <p>VAT %: </p>
                                    </div>
                                    <div className="col-sm-8">
                                      <p>{j[3]}</p>
                                    </div>
                                    <div className="col-sm-4">
                                      <p>Description: </p>
                                    </div>
                                    <div className="col-sm-8">
                                      <p>{j[4]}</p>
                                    </div>
                                    <div className="col-sm-4">
                                      <p>Quantity: </p>
                                    </div>
                                    <div className="col-sm-8">
                                      <p>CC {j[5]}</p>
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
                            <p>{i.totalVAT}</p>
                          </div>
                          <div className="col-sm-4">
                            <p>Total Price: CC </p>
                          </div>
                          <div className="col-sm-8">
                            <p>{i.totalCC}</p>
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
                            <p>{i.shipment}</p>
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
                        {this.quarterList.map(quarter => this.printQuarters(quarter))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              { this.printStatus() }
              <br />
              { (this.state.invoices!==null) ? this.printInvoices() : null }
              
              
            </div>
          </div>
        </div>    
      </div>
    )
  }
}
export default TransactionsManager;