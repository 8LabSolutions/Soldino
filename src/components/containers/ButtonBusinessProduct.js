/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import businessActionCreator from '../../actionsCreator/businessActionCreator';
import { getBase64 } from '../../auxiliaryFunctions';
import { beginLoading, endLoading } from '../../actions/login';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    action: (parametersArray) => {
      dispatch(beginLoading())
      if(parametersArray[4]!==null){
        getBase64(parametersArray[4]).then((base64Image)=>{
          parametersArray[4] = base64Image
          businessActionCreator.addProduct(...parametersArray)
          .then(()=>{
            businessActionCreator.getMyProducts(ownProps.amount, ownProps.index).then((action)=>{
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
          businessActionCreator.getMyProducts(ownProps.amount, ownProps.index).then((action)=>{
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
