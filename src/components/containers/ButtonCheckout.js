/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import { cartToOrders } from '../../actions/cart';

const mapDispatchToProps = (dispatch) => {
  return {
    action: (cart) => {
      //dispatch(cartToPending(cart))
      dispatch(cartToOrders(cart))
    }
  }
}

const ButtonCheckout = connect(null, mapDispatchToProps)(Button);

export default ButtonCheckout;
