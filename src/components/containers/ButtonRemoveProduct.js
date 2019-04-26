/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import businessActionCreator from '../../actionsCreator/businessActionCreator';
import { beginLoading, endLoading } from '../../actions/login';
import { amountStore, defaultIndex } from '../../constants/fixedValues';

const mapDispatchToProps = (dispatch) => {
  return {
    action: (keyProd) => {
      dispatch(beginLoading())
      businessActionCreator.deleteProduct(keyProd)
      .then(()=>{
        businessActionCreator.getMyProducts(amountStore, defaultIndex).then((action)=>{
          dispatch(action)
          dispatch(endLoading())
        })
      })
      .catch((err)=>{
        console.log(err)
        dispatch(endLoading())
      })
    }
  }
}

const ButtonRemoveProduct = connect(null, mapDispatchToProps)(Button);

export default ButtonRemoveProduct;
