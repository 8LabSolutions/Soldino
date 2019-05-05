/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import Button from '../presentational/Button';
import businessActionCreator from '../../actionsCreator/businessActionCreator';
import { getBase64 } from '../../auxiliaryFunctions';
import { beginLoading, endLoading } from '../../actions/login';
import { amountStore, defaultIndex, ERRORTOAST, SUCCESSTOAST } from '../../constants/fixedValues';


/**
 * @description map the addProduct action into the Button component
 * @param {*} dispatch
 * @param {*} ownProps
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  const { toastManager } = ownProps;
  return {
    /**
     * @description Add new product to sell.
     * @param {*} parametersArray: product array with its params: [title, description, netPrice, VATPercentage, image]
     */
    action: (parametersArray) => {
      //check if title, description, netPrice and VATPercentage are void
      let voidValue = [];
      for(let i=0; i<4; i++) {
        voidValue[i] = false
        if(parametersArray[i]===""){
          voidValue[i] = true
        }
      }
      if(voidValue[0]===false &&
         voidValue[1]===false &&
         voidValue[2]===false &&
         voidValue[3]===false){
        //continue only if title, description, netPrice and VATPercentage are not void
        dispatch(beginLoading())
        if(parametersArray[4]!==null){
          //if image is not null => set the image passed by arg
          getBase64(parametersArray[4]).then((base64Image)=>{
            parametersArray[4] = base64Image
            businessActionCreator.addProduct(...parametersArray)
            .then(()=>{
              businessActionCreator.getMyProducts(amountStore, defaultIndex)
              .then((action)=>{
                dispatch(action)
                toastManager.add("Product added successfully.", SUCCESSTOAST)
                dispatch(endLoading())
              })
            })
            .catch((err)=>{
              toastManager.add(err, ERRORTOAST)
              dispatch(endLoading())
            })
          })
        }else{
          //set the default image by setting no image
          businessActionCreator.addProduct(...parametersArray)
          .then(()=>{
            businessActionCreator.getMyProducts(amountStore, defaultIndex)
            .then((action)=>{
              dispatch(action)
              toastManager.add("Product added successfully.", SUCCESSTOAST)
              dispatch(endLoading())
            })
          })
          .catch((err)=>{
            toastManager.add(err, ERRORTOAST)
            dispatch(endLoading())
          })
        }
      }else{
        //show toast with missed field
        let params = ["title", "description", "net price", "vat percentage"]
        for(let i=0; i<voidValue.length; i++) {
          if(voidValue[i]===true){
            toastManager.add("You missed the "+params[i]+".", ERRORTOAST)
          }
        }
      }
    }
  }
}

/**
 * @description connect the action to the Button props
 */
const ButtonBusinessProduct = connect(null, mapDispatchToProps)(Button);

export default withToastManager(ButtonBusinessProduct);
