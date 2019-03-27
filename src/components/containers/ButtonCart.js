/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import { removeFromCart } from '../../actions/cart';

const mapDispatchToProps = (dispatch) => {
  return {
    action: (product) => {
      dispatch(removeFromCart(product))
    }
  }
}

const ButtonCart = connect(null, mapDispatchToProps)(Button);

export default ButtonCart;
