import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import ProductsManager from '../presentational/ProductsManager';
import businessActionCreator from '../../actionsCreator/businessActionCreator';
import { increaseIndex, decreaseIndex, resetIndex } from '../../actions/store';
import { amountStore, ERRORTOAST } from '../../constants/fixedValues';
import { store } from '../../store';
import { setTotalNumberOfMyProducts } from '../../actions/business';

const mapDispatchToProps = (dispatch, ownProps) => {
  const { toastManager } = ownProps;
  return {
    getProductsList: (index)=> {
      //call the action creator to dispatch the products getter
      dispatch(resetIndex())
      businessActionCreator.getTotalStoreProduct()
      .then((total)=>{
        dispatch(setTotalNumberOfMyProducts(total))
      })
      .catch((err)=>{
        toastManager.add(err, ERRORTOAST);
      })
      businessActionCreator.getMyProducts(amountStore, index)
      .then((action)=>{
        dispatch(action)
      })
      .catch((err)=>{
        toastManager.add(err, ERRORTOAST);
      })
    },
    increaseIndex: () => {
      dispatch(increaseIndex())
      businessActionCreator.getMyProducts(amountStore, store.getState().index)
      .then((action)=>{
        dispatch(action)
      })
      .catch((err)=>{
        toastManager.add(err, ERRORTOAST);
      })
    },
    decreaseIndex: () => {
      dispatch(decreaseIndex())
      businessActionCreator.getMyProducts(amountStore, store.getState().index)
      .then((action)=>{
        dispatch(action)
      })
      .catch((err)=>{
        toastManager.add(err, ERRORTOAST);
      })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    myProductsArray: state.myProductsArray,
    index: state.index,
    totalMyProduct: state.totalMyProduct
  }
}

const ProductManagerContainer = connect(mapStateToProps, mapDispatchToProps)(ProductsManager);

export default withToastManager(ProductManagerContainer);
