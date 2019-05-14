/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import { passKeyProd } from '../../actions/business';

/**
 * @description map the passKeyProd action into the Button component
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch) => {
  return {
    /**
     * @description Save a product key into the keyProd state value.
     * @param {*} product
     */
    action: (product) => {
      dispatch(passKeyProd(product))
    }
  }
}

/**
 * @description connect the action to the Button props
 */
const ButtonPassKeyProd = connect(null, mapDispatchToProps)(Button);

export default ButtonPassKeyProd;
