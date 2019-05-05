/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import FormCubitManager from '../presentational/FormCubitManager';
import governmentActionCreator from "../../actionsCreator/governmentActionCreator"
import { beginLoading, endLoading } from '../../actions/login';
import { CITIZEN, BUSINESS } from '../../constants/actionTypes';
import { amountStore, defaultIndex, amountUser, ERRORTOAST, SUCCESSTOAST } from '../../constants/fixedValues';

/**
 * @description map the getBalanceAndTotalAmount, mint, distribute, getCitizenList, getBusinessList actions into the FormCubitManager component
 * @param {*} dispatch
 * @param {*} ownProps
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  const { toastManager } = ownProps;
  return {
    /**
     * @description Get government balance and total amount.
     */
    getBalanceAndTotalAmount: ()=>{
      governmentActionCreator.getBalanceAndTotalAmount()
      .then((action)=>{
        dispatch(action);
      })
      .catch((err)=>{
        toastManager.add(err, ERRORTOAST);
      })
    },

    /**
     * @description Mint an amount of Cubit.
     * @param {*} amount in CC
     */
    mint: (amount)=> {
      if(amount!==null){
        dispatch(beginLoading())
        governmentActionCreator.mint(amount)
        .then((action)=>{
          //success
          dispatch(action)
          toastManager.add(amount+" CC minted.", SUCCESSTOAST);
          dispatch(endLoading())
        })
        .catch((err)=>{
          //error
          dispatch(endLoading())
          toastManager.add(err, ERRORTOAST);
        })
      }{
        toastManager.add("You have to select an amount to mint.", ERRORTOAST)
      }
    },

    /**
     * @description Distribute an amount of Cubit to a list of address.
     * @param {*} amount in CC
     * @param {*} addresses
     */
    distribute: (amount, addresses)=>{
      if(addresses.length>0 && amount!==null){
        dispatch(beginLoading())
        var final = []
        addresses.forEach(address => {
          final.push(address.value)
        });

        governmentActionCreator.distribute(amount, final)
        .then((action)=>{
          //success
          dispatch(action)
          toastManager.add(amount*addresses.length +" CC distributed.", SUCCESSTOAST);
          dispatch(endLoading())
        })
        .catch((err)=>{
          //error
          toastManager.add(err, ERRORTOAST);
          dispatch(endLoading())
        })
      }else{
        if(addresses.length===0){toastManager.add("You have to select at least one recipient.", ERRORTOAST);}
        if(amount===null){toastManager.add("You have to select an amount to distribute.", ERRORTOAST)}
      }
    },

    /**
     * @description Get the list of registered citizens.
     */
    getCitizenList: ()=> {
      governmentActionCreator.getUserList(amountUser, defaultIndex, CITIZEN)
      .then((action)=>{
        //success
        dispatch(action);
      })
      .catch((err)=>{
        //error
        toastManager.add(err, ERRORTOAST);
      })
    },

    /**
     * @description Get the list of registered businesses.
     */
    getBusinessList: ()=> {
      governmentActionCreator.getUserList(amountUser, defaultIndex, BUSINESS)
      .then((action)=>{
        //success
        dispatch(action);
      })
      .catch((err)=>{
        //error
        toastManager.add(err, ERRORTOAST);
      })
    }

  }
}

/**
 * @description map the totalSupply, governmentSupply, citizenList, businessList state values into the FormCubitManager component
 * @param {*} state
 */
const mapStateToProps = (state) => {
  //getting the total supply of token and the government balance
  return {
    totalSupply: state.totalSupply,
    governmentSupply: state.governmentSupply,
    citizenList: state.citizenList,
    businessList: state.businessList
  }
}

/**
 * @description connect the state and action to the FormCubitManager props
 */
const FormCubitManagerContainer = connect(mapStateToProps, mapDispatchToProps)(FormCubitManager);

export default withToastManager(FormCubitManagerContainer);
