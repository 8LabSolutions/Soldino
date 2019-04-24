import { connect } from 'react-redux';
import ProductsManager from '../presentational/ProductsManager';
import businessActionCreator from '../../actionsCreator/businessActionCreator';

const mapDispatchToProps = (dispatch) => {
  //should dispatch the action that fills the store with the first 50 users
  //*!!! maybe only the first time !!!*/
  return {
    getProductsList: (amount, index)=> {
      //call the action creator to dispatch the products getter
      businessActionCreator.getMyProducts(amount, index).then((action)=>{
        dispatch(action)
      })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    myProductsArray: state.myProductsArray
  }
}

const ProductManagerContainer = connect(mapStateToProps, mapDispatchToProps)(ProductsManager);

export default ProductManagerContainer;
