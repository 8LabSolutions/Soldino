/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import FormCubitManager from '../presentational/FormCubitManager';
import governmentActionCreator from "../../actionsCreator/governmentActionCreator"

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
      governmentActionCreator.mint(amount).then((action)=>{
        console.log(action)
        dispatch(action)
      })
    },

    distribute: (amount, address)=>{
      governmentActionCreator.distribute(amount, address).then((action)=>{
        dispatch(action)
      })
    }
  }
}

const mapStateToProps = (state) => {
  //getting the total supply of token and the government balance
  return {
    totalSupply: state.totalSupply,
    governmentSupply: state.governmentSupply
  }
}

const FormCubitManagerContainer = connect(mapStateToProps, mapDispatchToProps)(FormCubitManager);

export default FormCubitManagerContainer;
