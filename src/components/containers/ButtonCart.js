/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import { removeFromCart } from '../../actions/cart';

/**
 * @description map the removeFromCart action into the Button component
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch) => {
  return {
    /**
     * @description Remove a specific product from cart.
     * @param {*} product
     */
    action: (product) => {
      dispatch(removeFromCart(product))
    }
  }
}

/**
 * @description connect the action to the Button props
 */
const ButtonCart = connect(null, mapDispatchToProps)(Button);

export default ButtonCart;
