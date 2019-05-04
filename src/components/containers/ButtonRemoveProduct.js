import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import Button from '../presentational/Button';
import businessActionCreator from '../../actionsCreator/businessActionCreator';
import { beginLoading, endLoading } from '../../actions/login';
import { amountStore, defaultIndex, ERRORTOAST } from '../../constants/fixedValues';

const mapDispatchToProps = (dispatch, ownProps) => {
  const { toastManager } = ownProps;
  return {
    action: (keyProd) => {
      dispatch(beginLoading())
      businessActionCreator.deleteProduct(keyProd)
      .then(()=>{
        businessActionCreator.getMyProducts(amountStore, defaultIndex)
        .then((action)=>{
          dispatch(action)
          dispatch(endLoading())
        })
        .catch((err)=>{
          toastManager.add(err, ERRORTOAST);
          dispatch(endLoading())
        })
      })
      .catch((err)=>{
        toastManager.add(err, ERRORTOAST);
        dispatch(endLoading())
      })
    }
  }
}

const ButtonRemoveProduct = connect(null, mapDispatchToProps)(Button);

export default withToastManager(ButtonRemoveProduct);
