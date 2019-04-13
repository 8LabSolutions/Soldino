/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import business from "../../facade/business"

const mapDispatchToProps = (dispatch) => {
  return {
    action: (parametersArray) => {
      //business.addProduct(title, description, netPrice, vatPercentage, image)
      business.addProduct(...parametersArray)
      .then(()=>{
        console.log('prodotto inserito')
        setTimeout(5000);
        business.getSenderProduct().then(console.log).catch(console.log)
      })
      .catch(console.log)
    }
  }
}

const ButtonBusinessProduct = connect(null, mapDispatchToProps)(Button);

export default ButtonBusinessProduct;
