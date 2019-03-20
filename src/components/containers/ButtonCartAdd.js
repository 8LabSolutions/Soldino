/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import { increaseQuantity } from '../../actions/cart';

const mapDispatchToProps = (dispatch) => {
  return {
    action: (title, quantity, price) => {
      dispatch(increaseQuantity(title, quantity, price))
    }
  }
}

const ButtonCartAdd = connect(null, mapDispatchToProps)(Button);

export default ButtonCartAdd;
