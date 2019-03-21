/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import { cartToPending } from '../../actions/purchasesConfirmation';

const mapDispatchToProps = (dispatch) => {
  return {
    action: (cart) => {
      dispatch(cartToPending(cart, null, null))
    }
  }
}

const ButtonCheckout = connect(null, mapDispatchToProps)(Button);

export default ButtonCheckout;
