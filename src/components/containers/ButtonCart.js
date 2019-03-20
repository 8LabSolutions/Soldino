/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import { removeFromCart } from '../../actions/cart';

const mapDispatchToProps = (dispatch) => {
  return {
    action: (title, quantity, price) => {
      dispatch(removeFromCart(title, quantity, price))
    }
  }
}

const ButtonProduct = connect(null, mapDispatchToProps)(Button);

export default ButtonProduct;
