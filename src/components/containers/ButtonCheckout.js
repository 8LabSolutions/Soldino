/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import { cartToOrders } from '../../actions/cart';

const mapDispatchToProps = (dispatch) => {
  return {
    action: (order) => {
      //order[0]: products in cart
      //order[1]: address
      dispatch(cartToOrders(order[0], order[1]))
    }
  }
}

const ButtonCheckout = connect(null, mapDispatchToProps)(Button);

export default ButtonCheckout;
