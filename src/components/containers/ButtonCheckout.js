import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import Button from '../presentational/Button';
import user from "../../facade/user"
import { getTodayDate, getVAT, getNet } from '../../auxiliaryFunctions';
import { store } from '../../store';
import { beginLoading, endLoading } from '../../actions/login';
import { resetCart } from '../../actions/cart';
import { ERRORTOAST, SUCCESSTOAST, INFOTOAST } from '../../constants/fixedValues';

const mapDispatchToProps = (dispatch, ownProps) => {
  const { toastManager } = ownProps;
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
      let id
      toastManager.add("You have to approve MetaMask requests twice. You'll have to wait SOME MINUTES between the two confirmations.", INFOTOAST, (x)=>{id=x});
      user.buy(cart)
      .then(()=>{
        toastManager.add("Purchase succeded", SUCCESSTOAST);
        toastManager.remove(id)
        dispatch(resetCart())
        dispatch(endLoading())
      })
      .catch((err)=>{
        toastManager.add(err, ERRORTOAST);
        toastManager.remove(id)
        dispatch(endLoading())
      })
    }
  }
}

const ButtonCheckout = connect(null, mapDispatchToProps)(Button);

export default withToastManager(ButtonCheckout);
