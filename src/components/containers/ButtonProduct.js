/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import { addToCart } from '../../actions/cart';

/**
 * @description map the addToCart action into the Button component
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch) => {
  return {
    /**
     * @description Add a product to the cart.
     * @param {*} product
     */
    action: (product) => {
      dispatch(addToCart(product))
    }
  }
}

/**
 * @description connect the action to the Button props
 */
const ButtonProduct = connect(null, mapDispatchToProps)(Button);

export default ButtonProduct;
