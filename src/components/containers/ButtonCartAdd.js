/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import { increaseQuantity } from '../../actions/cart';

const mapDispatchToProps = (dispatch) => {
  return {
    action: (product) => {
      dispatch(increaseQuantity(product))
    }
  }
}

const ButtonCartAdd = connect(null, mapDispatchToProps)(Button);

export default ButtonCartAdd;
