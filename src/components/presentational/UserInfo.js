/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import { BUSINESS } from '../../constants/actionTypes';
import { printShipment } from "../../auxiliaryFunctions/index";

export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  printInfo() {
    let {user, logged} = this.props;
    if(logged===true){
      return(
        <div className="container">
          <div className="row">
            <div className="col-sm-4">Name</div>
            <div className="col-sm-8">{user.name}</div>
            {(user.userType===BUSINESS) ? <div className="col-sm-4">VAT Number</div> : <div className="col-sm-4">Surame</div>}
            {(user.userType===BUSINESS) ? <div className="col-sm-8">{user.VATnumber}</div> : <div className="col-sm-8">{user.surname}</div>}
            <div className="col-sm-4">Email</div>
            <div className="col-sm-8">{user.email}</div>
            <div className="col-sm-4">Address</div>
            <div className="col-sm-8">{printShipment([user.streetName, user.streetNumber, user.district, user.postCode])}</div>
            <div className="col-sm-4">Balance</div>
            <div className="col-sm-8">CC {user.balance}</div>
          </div>
        </div>
      )
    }
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <span id="Popover1" className="nav-item nav-link material-icons customCursorPointer">account_circle</span>
        <UncontrolledPopover trigger="legacy" placement="bottom" target="Popover1">
          <PopoverHeader>User info:</PopoverHeader>
          <PopoverBody>{this.printInfo()}</PopoverBody>
        </UncontrolledPopover>
      </div>
    );
  }
}
