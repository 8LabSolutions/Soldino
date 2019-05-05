/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import { increaseQuantity } from '../../actions/cart';

/**
 * @description map the increaseQuantity action into the Button component
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch) => {
  return {
    /**
     * @description Increase the quantity of a specific product into the cart.
     * @param {*} product
     */
    action: (product) => {
      dispatch(increaseQuantity(product))
    }
  }
}

/**
 * @description connect the action to the Button props
 */
const ButtonCartAdd = connect(null, mapDispatchToProps)(Button);

export default ButtonCartAdd;
