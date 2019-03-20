/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import { addToCart } from '../../actions/cart';

const mapDispatchToProps = (dispatch) => {
  return {
    action: (title, quantity, price) => {
      dispatch(addToCart(title, quantity, price))
    }
  }
}

const ButtonProduct = connect(null, mapDispatchToProps)(Button);

export default ButtonProduct;
