/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import userActionCreator from "../../actionsCreator/userActionCreator"
import Orders from '../presentational/Orders';

const mapDispatchToProps = (dispatch) => {
  return {
    getOrdersList: ()=> {
      userActionCreator.getOrdersList().then((action)=>{
        dispatch(action);
      })
    }
  }
}

const mapStateToProps = (state) => {
  //getting the total supply of token and the government balance
  return {
    ordersList: state.ordersList,
  }
}

const OrdersContainer = connect(mapStateToProps, mapDispatchToProps)(Orders);

export default OrdersContainer;
