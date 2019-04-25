/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import FormCubitManager from '../presentational/FormCubitManager';
import governmentActionCreator from "../../actionsCreator/governmentActionCreator"
import { beginLoading, endLoading } from '../../actions/login';
import { CITIZEN, BUSINESS } from '../../constants/actionTypes';
import { amountStore, defaultIndex, amountUser } from '../../constants/fixedValues';

const mapDispatchToProps = (dispatch) => {
  //should dispatch the action that fills the store with the first 50 users
  //*!!! maybe only the first time !!!*/
  return {
    getBalanceAndTotalAmount: ()=>{
      governmentActionCreator.getBalanceAndTotalAmount().then((action)=>{
        dispatch(action);
      })
    },

    mint: (amount)=> {
      dispatch(beginLoading())
      governmentActionCreator.mint(amount).then((action)=>{
        console.log(action)
        dispatch(action)
        dispatch(endLoading())
      })
    },

    distribute: (amount, addresses)=>{
      dispatch(beginLoading())
      //FOR EACH ADDRESS INTO ADDRESSES
      //TO DO
      let address = null
      if(addresses.length > 0){ address = addresses[0] }
      governmentActionCreator.distribute(amount, address).then((action)=>{
        dispatch(action)
        dispatch(endLoading())
      })
    },

    getCitizenList: ()=> {
      governmentActionCreator.getUserList(amountUser, defaultIndex, CITIZEN).then((action)=>{
        dispatch(action);
      })
    },

    getBusinessList: ()=> {
      governmentActionCreator.getUserList(amountUser, defaultIndex, BUSINESS).then((action)=>{
        dispatch(action);
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

export default FormCubitManagerContainer;
