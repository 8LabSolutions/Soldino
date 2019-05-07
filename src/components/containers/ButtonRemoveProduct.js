import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import Button from '../presentational/Button';
import businessActionCreator from '../../actionsCreator/businessActionCreator';
import { amountStore, defaultIndex, ERRORTOAST, SUCCESSTOAST, INFOTOAST } from '../../constants/fixedValues';

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
      let id
      toastManager.add("You have to approve MetaMask request. You'll have to wait few minutes for the confirmation.", INFOTOAST, (x)=>{id=x});
      businessActionCreator.deleteProduct(keyProd)
      .then(()=>{
        businessActionCreator.getMyProducts(amountStore, defaultIndex)
        .then((action)=>{
          //success
          toastManager.remove(id)
          toastManager.add("Product removed successfully.", SUCCESSTOAST)
          dispatch(action)
        })
        .catch((err)=>{
          //error
          toastManager.remove(id)
          toastManager.add(err, ERRORTOAST);
        })
      })
      .catch((err)=>{
        //error
        toastManager.add(err, ERRORTOAST);
      })
    }
  }
}

/**
 * @description connect the action to the Button props
 */
const ButtonRemoveProduct = connect(null, mapDispatchToProps)(Button);

export default withToastManager(ButtonRemoveProduct);
