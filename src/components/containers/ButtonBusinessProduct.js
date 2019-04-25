/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import businessActionCreator from '../../actionsCreator/businessActionCreator';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    action: (parametersArray) => {
      console.log("ButtonBusinessProduct [9]")
      console.log(parametersArray)
      //business.addProduct(title, description, netPrice, vatPercentage, image)
      businessActionCreator.addProduct(...parametersArray)
      .then(()=>{
        businessActionCreator.getMyProducts(ownProps.amount, ownProps.index).then((action)=>{
          console.log('dispatcho')
          dispatch(action)
        })
      })
      .catch(console.log)
    }
  }
}

const ButtonBusinessProduct = connect(null, mapDispatchToProps)(Button);

export default ButtonBusinessProduct;
