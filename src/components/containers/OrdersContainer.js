import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import userActionCreator from "../../actionsCreator/userActionCreator"
import Orders from '../presentational/Orders';
import { ERRORTOAST } from '../../constants/fixedValues';

/**
 * @description map the getOrdersList action into the Orders component
 * @param {*} dispatch
 * @param {*} ownProps
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  const { toastManager } = ownProps;
  return {
    /**
     * @description Get all the orders in a list.
     */
    getOrdersList: ()=> {
      userActionCreator.getOrdersList()
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
 * @description map the ordersList state value into the Orders component
 * @param {*} state
 */
const mapStateToProps = (state) => {
  return {
    ordersList: state.ordersList,
  }
}

/**
 * @description connect the state and the action to the Orders props
 */
const OrdersContainer = connect(mapStateToProps, mapDispatchToProps)(Orders);

export default withToastManager(OrdersContainer);
