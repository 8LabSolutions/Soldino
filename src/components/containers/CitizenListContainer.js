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

const mapDispatchToProps = (dispatch, ownProps) => {
  const { toastManager } = ownProps;
  return {
    resetSearch: () => {
      dispatch(searchaction(""))
    },

    getUserList: (amount, index)=> {
      governmentActionCreator.getUserList(amount, index, CITIZEN)
      .then((action)=>{
        dispatch(action);
      })
      .catch((err)=>{
        toastManager.add(err, ERRORTOAST);
      })
    },

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

const mapStateToProps = (state) => {
  return {
    userList: state.citizenList,
    searchProduct: state.searchProduct
  }
}

const CitizenListContainer = connect(mapStateToProps, mapDispatchToProps)(UsersList);

export default withToastManager(CitizenListContainer);
