/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import businessActionCreator from '../../actionsCreator/businessActionCreator';
import { getBase64 } from '../../auxiliaryFunctions';
import { beginLoading, endLoading } from '../../actions/login';
import { amountStore, defaultIndex } from '../../constants/fixedValues';

const mapDispatchToProps = (dispatch) => {
  return {
    action: (parametersArray) => {
      dispatch(beginLoading())
      if(parametersArray[4]!==null){
        getBase64(parametersArray[4]).then((base64Image)=>{
          parametersArray[4] = base64Image
          businessActionCreator.addProduct(...parametersArray)
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
        })
      }else{
        businessActionCreator.addProduct(...parametersArray)
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
}

const ButtonBusinessProduct = connect(null, mapDispatchToProps)(Button);

export default ButtonBusinessProduct;
