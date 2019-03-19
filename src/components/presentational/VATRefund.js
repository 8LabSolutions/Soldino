import React, {Component} from 'react';
import NavBar from './NavBar'
import { store } from "../../store/index";

class VATRefund extends Component {
  render() {
    if(store.getState().logged === false || store.getState().userType !== "Govern"){window.location.href = "/"}
    //need to check if user type is government, else redirect to home like previous line
    return (
      <div>
        <NavBar />
        <p>vat refund</p>
      </div>
    )
  }
}

export default VATRefund;