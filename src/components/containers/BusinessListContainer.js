/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import React from 'react';
import { withToastManager } from 'react-toast-notifications';
import UsersList from '../presentational/UsersList';
import governmentActionCreator from "../../actionsCreator/governmentActionCreator"
import {BUSINESS} from "../../constants/actionTypes"
import ButtonState from './ButtonState';
import { printShipment } from '../../auxiliaryFunctions';
import { searchaction } from '../../actions/searchaction';
import { ERRORTOAST } from '../../constants/fixedValues';

const mapDispatchToProps = (dispatch, ownProps) => {
  const { toastManager } = ownProps;
  return {
    resetSearch: () => {
      dispatch(searchaction(""))
    },

    getUserList: (amount, index)=> {
      governmentActionCreator.getUserList(amount, index, BUSINESS)
      .then((action)=>{
        dispatch(action);
      })
      .catch((err)=>{
        toastManager.add(err, ERRORTOAST);
      })
    },

    printUser: (business)=>{
      let dynamicText
      (business.state===true) ? dynamicText="Disable" : dynamicText="Enable";
      var button = <ButtonState text={dynamicText} state={business.state} address={business.address} type={BUSINESS} />

      const Line = (business) =>(
        <li key={business.address} className="list-group-item userlist-item">
          <strong className="customCursor">Company name: </strong>
          <span className="customCursor">{business.name}</span>
          <br />
          <strong className="customCursor">VAT number: </strong>
          <span className="customCursor">{business.VATnumber}</span>
          <br />
          <strong className="customCursor">Email: </strong>
          <span className="customCursor">{business.email}</span>
          <br />
          <strong className="customCursor">Wallet address: </strong>
          <span className="customCursor">{business.address}</span>
          <br />
          <strong className="customCursor">Headquarters: </strong>
          <span className="customCursor">{printShipment([business.streetName, business.streetNumber, business.postCode, business.district])}</span>
          <br />
          {button}
        </li>
      )
      return Line(business);
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.businessList,
    searchProduct: state.searchProduct
  }
}

const BusinessListContainer = connect(mapStateToProps, mapDispatchToProps)(UsersList);

export default withToastManager(BusinessListContainer);
