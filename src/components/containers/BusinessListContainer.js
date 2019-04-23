/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import React from 'react';
import UsersList from '../presentational/UsersList';
import governmentActionCreator from "../../actionsCreator/governmentActionCreator"
import {BUSINESS} from "../../constants/actionTypes"
import ButtonState from './ButtonState';

const mapDispatchToProps = (dispatch, ownProps) => {
  //should dispatch the action that fills the store with the first 50 users
  //*!!! maybe only the first time !!!*/
  return {
    getUserList: (amount, index)=> {
      governmentActionCreator.getUserList(amount, index, BUSINESS).then((action)=>{
        dispatch(action);
      })
    },

    printUser: (business)=>{
      var button = <ButtonState state={business.state} address={business.address} />

      const Line = (business) =>(
        <li key={business.address} className="list-group-item">
          <strong>Company name: </strong>
          {business.name}
          <br />
          <strong>VAT number: </strong>
          {business.VATnumber}
          <br />
          <strong>Email: </strong>
          {business.email}
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
    userList: state.userList
  }
}

const BusinessListContainer = connect(mapStateToProps, mapDispatchToProps)(UsersList);

export default BusinessListContainer;
