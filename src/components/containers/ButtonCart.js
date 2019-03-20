/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import ButtonArgs from '../presentational/ButtonArgs';
import { removeFromCart } from '../../actions/cart';

const mapDispatchToProps = (dispatch) => {
  return {
    action: (title, quantity, price) => {
      dispatch(removeFromCart(title, quantity, price))
    }
  }
}

const ButtonProduct = connect(null, mapDispatchToProps)(ButtonArgs);

export default ButtonProduct;
