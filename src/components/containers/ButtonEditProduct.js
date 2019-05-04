/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import Button from '../presentational/Button';
import businessActionCreator from '../../actionsCreator/businessActionCreator';
import { getBase64 } from '../../auxiliaryFunctions';
import { beginLoading, endLoading } from '../../actions/login';
import { store } from '../../store';
import history from '../../store/history'
import { amountStore, defaultIndex, ERRORTOAST } from '../../constants/fixedValues';

const mapDispatchToProps = (dispatch, ownProps) => {
  const { toastManager } = ownProps;
  return {
    action: (parametersArray) => {
      parametersArray = [store.getState().editProd, ...parametersArray]
      if(
        parametersArray[1]==="" &&
        parametersArray[2]==="" &&
        parametersArray[3]==="" &&
        parametersArray[4]==="" &&
        parametersArray[5]===null
      ){
        //nothing has changed
        history.push("/erroredit")
      }else{
        //something has changed, need to check what has been changed and change it/them
        dispatch(beginLoading())
        let editedProduct = [parametersArray[0][0]]; //keyProd at first
        (parametersArray[1]!==parametersArray[0][1] && parametersArray[1]!=="") ? editedProduct = [...editedProduct, parametersArray[1]] : editedProduct = [...editedProduct, parametersArray[0][1]];
        (parametersArray[2]!==parametersArray[0][2] && parametersArray[2]!=="") ? editedProduct = [...editedProduct, parametersArray[2]] : editedProduct = [...editedProduct, parametersArray[0][2]];
        (parseFloat(parametersArray[3])!==parseFloat(parametersArray[0][3]) && parametersArray[3]!=="") ? editedProduct = [...editedProduct, parseFloat(parametersArray[3])] : editedProduct = [...editedProduct, parseFloat(parametersArray[0][3])];
        (parseFloat(parametersArray[4])!==parseFloat(parametersArray[0][4]) && parametersArray[4]!=="") ? editedProduct = [...editedProduct, parseFloat(parametersArray[4])] : editedProduct = [...editedProduct, parseFloat(parametersArray[0][4])];
        editedProduct[5] = parametersArray[5] //image
        editedProduct[6] = parametersArray[6] //sellername
        editedProduct[7] = parametersArray[7] //sellervat
        //need to check if picture has changed

        if(parametersArray[5]!==null){
          getBase64(parametersArray[5])
          .then((base64Image)=>{
            editedProduct[5] = base64Image
            businessActionCreator.modifyProduct(...editedProduct)
            .then(()=>{
              businessActionCreator.getMyProducts(amountStore, defaultIndex)
              .then((action)=>{
                dispatch(action)
                dispatch(endLoading())
                history.push("/productsmanager")
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
          })
        }else{
          editedProduct[5] = parametersArray[0][5];

          console.log([...editedProduct])
          businessActionCreator.modifyProduct(...editedProduct)
          .then(()=>{
            businessActionCreator.getMyProducts(amountStore, defaultIndex)
            .then((action)=>{
              dispatch(action)
              dispatch(endLoading())
              history.push("/productsmanager")
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
  }
}

const mapStateToProps = (state) => {
  return {
    editProd: state.editProd
  }
}

const ButtonEditProduct = connect(mapStateToProps, mapDispatchToProps)(Button);

export default withToastManager(ButtonEditProduct);
