/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import { decreaseQuantity } from '../../actions/cart';

const mapDispatchToProps = (dispatch) => {
  return {
    action: (title, quantity, price) => {
      dispatch(decreaseQuantity(title, quantity, price))
    }
  }
}

const ButtonCartRemove = connect(null, mapDispatchToProps)(Button);

export default ButtonCartRemove;
