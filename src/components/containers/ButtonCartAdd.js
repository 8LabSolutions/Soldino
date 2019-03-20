/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import ButtonArgs from '../presentational/ButtonArgs';
import { increaseQuantity } from '../../actions/cart';

const mapDispatchToProps = (dispatch) => {
  return {
    action: (title, quantity, price) => {
      dispatch(increaseQuantity(title, quantity, price))
    }
  }
}

const ButtonCartAdd = connect(null, mapDispatchToProps)(ButtonArgs);

export default ButtonCartAdd;
