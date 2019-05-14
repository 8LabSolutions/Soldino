/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import { decreaseQuantity } from '../../actions/cart';

/**
 * @description map the decreaseQuantity action into the Button component
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch) => {
  return {
    /**
     * @description Decrease the quantity of a specific product into the cart.
     * @param {*} product
     */
    action: (product) => {
      dispatch(decreaseQuantity(product))
    }
  }
}

/**
 * @description connect the action to the Button props
 */
const ButtonCartRemove = connect(null, mapDispatchToProps)(Button);

export default ButtonCartRemove;
