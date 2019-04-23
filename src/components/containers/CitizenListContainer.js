/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import React from 'react';
import UsersList from '../presentational/UsersList';
import governmentActionCreator from "../../actionsCreator/governmentActionCreator"
import {CITIZEN} from "../../constants/actionTypes"
import ButtonState from './ButtonState';

const mapDispatchToProps = (dispatch, ownProps) => {
  //should dispatch the action that fills the store with the first 50 users
  //*!!! maybe only the first time !!!*/
  return {
    getUserList: (amount, index)=> {
      governmentActionCreator.getUserList(amount, index, CITIZEN).then((action)=>{
        dispatch(action);
      })
    },

    printUser: (citizen)=>{
      const Line = (citizen) =>(
        <li key={citizen.address} className="list-group-item">
          <strong>Name: </strong>
          {citizen.name}
          <br />
          <strong>Surname: </strong>
          {citizen.surname}
          <br />
          <strong>Email: </strong>
          {citizen.email}
          <br />
          <ButtonState state={citizen.state} address={citizen.address} />
        </li>
      )
      return Line(citizen);
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.citizenList
  }
}

const CitizenListContainer = connect(mapStateToProps, mapDispatchToProps)(UsersList);

export default CitizenListContainer;
