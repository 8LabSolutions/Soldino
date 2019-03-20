/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import ButtonArgs from '../presentational/ButtonArgs';
import { decreaseQuantity } from '../../actions/cart';

const mapDispatchToProps = (dispatch) => {
  return {
    action: (title, quantity, price) => {
      dispatch(decreaseQuantity(title, quantity, price))
    }
  }
}

const ButtonCartRemove = connect(null, mapDispatchToProps)(ButtonArgs);

export default ButtonCartRemove;
