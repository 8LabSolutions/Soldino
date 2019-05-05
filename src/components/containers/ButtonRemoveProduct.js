import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import Button from '../presentational/Button';
import businessActionCreator from '../../actionsCreator/businessActionCreator';
import { beginLoading, endLoading } from '../../actions/login';
import { amountStore, defaultIndex, ERRORTOAST, SUCCESSTOAST } from '../../constants/fixedValues';

/**
 * @description map the removeProduct action into the Button component
 * @param {*} dispatch
 * @param {*} ownProps
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  const { toastManager } = ownProps;
  return {
    /**
     * @description Remove a product from store.
     * @param {*} keyProd: product key to remove
     */
    action: (keyProd) => {
      dispatch(beginLoading())
      businessActionCreator.deleteProduct(keyProd)
      .then(()=>{
        businessActionCreator.getMyProducts(amountStore, defaultIndex)
        .then((action)=>{
          //success
          toastManager.add("Product removed successfully.", SUCCESSTOAST)
          dispatch(action)
          dispatch(endLoading())
        })
        .catch((err)=>{
          //error
          toastManager.add(err, ERRORTOAST);
          dispatch(endLoading())
        })
      })
      .catch((err)=>{
        //error
        toastManager.add(err, ERRORTOAST);
        dispatch(endLoading())
      })
    }
  }
}

/**
 * @description connect the action to the Button props
 */
const ButtonRemoveProduct = connect(null, mapDispatchToProps)(Button);

export default withToastManager(ButtonRemoveProduct);
