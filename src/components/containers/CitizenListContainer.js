import { connect } from 'react-redux';
import React from 'react';
import { withToastManager } from 'react-toast-notifications';
import UsersList from '../presentational/UsersList';
import governmentActionCreator from "../../actionsCreator/governmentActionCreator"
import {CITIZEN} from "../../constants/actionTypes"
import ButtonState from './ButtonState';
import { printShipment } from '../../auxiliaryFunctions';
import { searchaction } from '../../actions/searchaction';
import { ERRORTOAST } from '../../constants/fixedValues';

/**
 * @description map the resetSearch, getUserList, printUser actions into the UsersList component
 * @param {*} dispatch
 * @param {*} ownProps
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  const { toastManager } = ownProps;
  return {

    /**
     * @description reset the searched string
     */
    resetSearch: () => {
      dispatch(searchaction(""))
    },

    /**
     * @description get all the citizen users in a list
     * @param {*} amount users to get
     * @param {*} index start value (index*amount is the first user position)
     */
    getUserList: (amount, index)=> {
      governmentActionCreator.getUserList(amount, index, CITIZEN)
      .then((action)=>{
        dispatch(action);
      })
      .catch((err)=>{
        toastManager.add(err, ERRORTOAST);
      })
    },

    /**
     * @description print a formatted citizen user
     * @param {*} citizen to print
     */
    printUser: (citizen)=>{
      let dynamicText
      (citizen.state===true) ? dynamicText="Disable" : dynamicText="Enable";
      const Line = (citizen) =>(
        <li key={citizen.address} className="list-group-item userlist-item">
          <strong className="customCursor">Name: </strong>
          <span className="customCursor">{citizen.name}</span>
          <br />
          <strong className="customCursor">Surname: </strong>
          <span className="customCursor">{citizen.surname}</span>
          <br />
          <strong className="customCursor">Email: </strong>
          <span className="customCursor">{citizen.email}</span>
          <br />
          <strong className="customCursor">Wallet address: </strong>
          <span className="customCursor">{citizen.address}</span>
          <br />
          <strong className="customCursor">Address: </strong>
          <span className="customCursor">{printShipment([citizen.streetName, citizen.streetNumber, citizen.postCode, citizen.district])}</span>
          <br />
          <ButtonState text={dynamicText} state={citizen.state} address={citizen.address} type={CITIZEN} />
        </li>
      )
      return Line(citizen);
    }
  }
}

/**
 * @description map the citizenList and searchProduct state values into the UsersList component
 * @param {*} state
 */
const mapStateToProps = (state) => {
  return {
    userList: state.citizenList,
    searchProduct: state.searchProduct
  }
}

/**
 * @description connect the state and action to the UsersList props
 */
const CitizenListContainer = connect(mapStateToProps, mapDispatchToProps)(UsersList);

export default withToastManager(CitizenListContainer);
