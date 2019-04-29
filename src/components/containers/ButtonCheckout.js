/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import user from "../../facade/user"
import { getTodayDate, getVAT, getNet } from '../../auxiliaryFunctions';
import { store } from '../../store';
import { beginLoading, endLoading } from '../../actions/login';
import { resetCart } from '../../actions/cart';

const mapDispatchToProps = (dispatch) => {
  return {
    action: (order) => {
      dispatch(beginLoading())
      var cart = {
        products: [...order[0]],
        date: getTodayDate(),
        VAT: getVAT([...order[0]]),
        net: getNet([...order[0]]),
        address: order[1],
        buyerName: store.getState().user.name,
        buyerDetails: store.getState().user.surname
      }
      user.buy(cart).then(()=>{
        dispatch(resetCart())
        dispatch(endLoading())
      })
    }
  }
}

const ButtonCheckout = connect(null, mapDispatchToProps)(Button);

export default ButtonCheckout;
