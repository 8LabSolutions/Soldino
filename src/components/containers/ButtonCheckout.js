import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import Button from '../presentational/Button';
import user from "../../facade/user"
import { getTodayDate, getVAT, getNet } from '../../auxiliaryFunctions';
import { store } from '../../store';
import { resetCart } from '../../actions/cart';
import { ERRORTOAST, SUCCESSTOAST, INFOTOAST } from '../../constants/fixedValues';
import userActionCreator from '../../actionsCreator/userActionCreator'

/**
 * @description map the checkout action into the Button component
 * @param {*} dispatch
 * @param {*} ownProps
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  const { toastManager } = ownProps;
  return {
    /**
     * @description Proceed to pay a order.
     * @param {*} order
     */
    action: (order) => {
      //dispatch(beginLoading())
      //get the cart content
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
      //show info message
      dispatch(resetCart())
      toastManager.add("You have to approve MetaMask requests twice. You'll have to wait few minutes between the two confirmations.", INFOTOAST, (x)=>{id=x});
      //buy the cart content
      user.buy(cart)
      .then(()=>{
        //success
        dispatch(userActionCreator.updateBalance())
        toastManager.add("Purchase succeded", SUCCESSTOAST);
        toastManager.remove(id)
        //after success, reset cart content
        //dispatch(endLoading())
      })
      .catch((err)=>{
        //error
        toastManager.add(err, ERRORTOAST);
        toastManager.remove(id)
        //dispatch(endLoading())
      })
    }
  }
}

/**
 * @description connect the action to the Button props
 */
const ButtonCheckout = connect(null, mapDispatchToProps)(Button);

export default withToastManager(ButtonCheckout);
