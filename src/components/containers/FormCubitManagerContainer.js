/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import FormCubitManager from '../presentational/FormCubitManager';
import governmentActionCreator from "../../actionsCreator/governmentActionCreator"
import { beginLoading, endLoading } from '../../actions/login';
import { CITIZEN, BUSINESS } from '../../constants/actionTypes';
import { amountStore, defaultIndex, amountUser, ERRORTOAST } from '../../constants/fixedValues';

const mapDispatchToProps = (dispatch, ownProps) => {
  const { toastManager } = ownProps;
  return {
    getBalanceAndTotalAmount: ()=>{
      governmentActionCreator.getBalanceAndTotalAmount()
      .then((action)=>{
        dispatch(action);
      })
      .catch((err)=>{
        toastManager.add(err, ERRORTOAST);
      })
    },

    mint: (amount)=> {
      dispatch(beginLoading())
      governmentActionCreator.mint(amount)
      .then((action)=>{
        dispatch(action)
        dispatch(endLoading())
      })
      .catch((err)=>{
        dispatch(endLoading())
        toastManager.add(err, ERRORTOAST);
      })
    },

    distribute: (amount, addresses)=>{
      dispatch(beginLoading())
      var final = []
      addresses.forEach(address => {
        final.push(address.value)
      });

      governmentActionCreator.distribute(amount, final)
      .then((action)=>{
        dispatch(action)
        dispatch(endLoading())
      })
      .catch((err)=>{
        toastManager.add(err, ERRORTOAST);
        dispatch(endLoading())
      })
    },

    getCitizenList: ()=> {
      governmentActionCreator.getUserList(amountUser, defaultIndex, CITIZEN)
      .then((action)=>{
        dispatch(action);
      })
      .catch((err)=>{
        toastManager.add(err, ERRORTOAST);
      })
    },

    getBusinessList: ()=> {
      governmentActionCreator.getUserList(amountUser, defaultIndex, BUSINESS)
      .then((action)=>{
        dispatch(action);
      })
      .catch((err)=>{
        toastManager.add(err, ERRORTOAST);
      })
    }

  }
}

const mapStateToProps = (state) => {
  //getting the total supply of token and the government balance
  return {
    totalSupply: state.totalSupply,
    governmentSupply: state.governmentSupply,
    citizenList: state.citizenList,
    businessList: state.businessList
  }
}

const FormCubitManagerContainer = connect(mapStateToProps, mapDispatchToProps)(FormCubitManager);

export default withToastManager(FormCubitManagerContainer);
