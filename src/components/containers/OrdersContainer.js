import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import userActionCreator from "../../actionsCreator/userActionCreator"
import Orders from '../presentational/Orders';
import { ERRORTOAST } from '../../constants/fixedValues';

const mapDispatchToProps = (dispatch, ownProps) => {
  const { toastManager } = ownProps;
  return {
    getOrdersList: ()=> {
      userActionCreator.getOrdersList()
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
    ordersList: state.ordersList,
  }
}

const OrdersContainer = connect(mapStateToProps, mapDispatchToProps)(Orders);

export default withToastManager(OrdersContainer);
