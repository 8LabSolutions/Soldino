import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import Button from '../presentational/Button';
import businessActionCreator from '../../actionsCreator/businessActionCreator';
import { getBase64 } from '../../auxiliaryFunctions';
import { store } from '../../store';
import history from '../../store/history'
import { amountStore, defaultIndex, ERRORTOAST, SUCCESSTOAST, INFOTOAST } from '../../constants/fixedValues';

/**
 * @description map the editProduct action into the Button component
 * @param {*} dispatch
 * @param {*} ownProps
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  const { toastManager } = ownProps;
  return {
    /**
     * @description Edit a product in sale.
     * @param {*} product array with its params: [title, description, netPrice, VATPercentage, image]
     */
    action: (parametersArray) => {
      //get old product info and new product info as [[oldTitle, oldDescription, oldNetPrice, oldVATPercentage, oldImage], newTitle, newDescription, newNetPrice, newVATPercentage, newImage]
      parametersArray = [store.getState().editProd, ...parametersArray]
      if(
        parametersArray[1]==="" && //new title
        parametersArray[2]==="" && //new description
        parametersArray[3]==="" && //new net price
        parametersArray[4]==="" && //new vat percentage
        parametersArray[5]===null  //new image
      ){
        //nothing has changed
        toastManager.add("You have to edit at least one field.", ERRORTOAST)
      }else{
        //something has changed, need to check what has been changed and change it/them
        let id
        toastManager.add("You have to approve MetaMask requests twice. You'll have to wait SOME MINUTES between the two confirmations.", INFOTOAST, (x)=>{id=x});
        //product key
        let editedProduct = [parametersArray[0][0]];
        //title
        (parametersArray[1]!==parametersArray[0][1] && parametersArray[1]!=="") ? editedProduct = [...editedProduct, parametersArray[1]] : editedProduct = [...editedProduct, parametersArray[0][1]];
        //description
        (parametersArray[2]!==parametersArray[0][2] && parametersArray[2]!=="") ? editedProduct = [...editedProduct, parametersArray[2]] : editedProduct = [...editedProduct, parametersArray[0][2]];
        //net price
        (parseFloat(parametersArray[3])!==parseFloat(parametersArray[0][3]) && parametersArray[3]!=="") ? editedProduct = [...editedProduct, parseFloat(parametersArray[3])] : editedProduct = [...editedProduct, parseFloat(parametersArray[0][3])];
        //vat percentage
        (parseFloat(parametersArray[4])!==parseFloat(parametersArray[0][4]) && parametersArray[4]!=="") ? editedProduct = [...editedProduct, parseFloat(parametersArray[4])] : editedProduct = [...editedProduct, parseFloat(parametersArray[0][4])];
        //image
        editedProduct[5] = parametersArray[5]
        //seller name
        editedProduct[6] = parametersArray[6]
        //seller VAT number
        editedProduct[7] = parametersArray[7]
        //need to check if picture has changed
        if(parametersArray[5]!==null){
          //picture has changed
          getBase64(parametersArray[5])
          .then((base64Image)=>{
            editedProduct[5] = base64Image
            businessActionCreator.modifyProduct(...editedProduct)
            .then(()=>{
              businessActionCreator.getMyProducts(amountStore, defaultIndex)
              .then((action)=>{
                dispatch(action)
                toastManager.add("Product edited successfully.", SUCCESSTOAST)
                toastManager.remove(id)
                history.push("/productsmanager")
              })
              .catch((err)=>{
                toastManager.add(err, ERRORTOAST);
                toastManager.remove(id)
              })
            })
            .catch((err)=>{
              toastManager.add(err, ERRORTOAST);
              toastManager.remove(id)
            })
          })
        }else{
          //picture has not changed, maintain the old image
          editedProduct[5] = parametersArray[0][5];
          businessActionCreator.modifyProduct(...editedProduct)
          .then(()=>{
            businessActionCreator.getMyProducts(amountStore, defaultIndex)
            .then((action)=>{
              dispatch(action)
              toastManager.add("Product edited successfully.", SUCCESSTOAST)
              toastManager.remove(id)
              history.push("/productsmanager")
            })
            .catch((err)=>{
              toastManager.add(err, ERRORTOAST);
              toastManager.remove(id)
            })
          })
          .catch((err)=>{
            toastManager.add(err, ERRORTOAST);
            toastManager.remove(id)
          })
        }
      }
    }
  }
}

/**
 * @description map the editProd state value into the Button component
 * @param {*} state
 */
const mapStateToProps = (state) => {
  return {
    editProd: state.editProd
  }
}

/**
 * @description connect the state and the action to the Button props
 */
const ButtonEditProduct = connect(mapStateToProps, mapDispatchToProps)(Button);

export default withToastManager(ButtonEditProduct);
