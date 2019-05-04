/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import Store from '../presentational/Store';
import businessActionCreator from '../../actionsCreator/businessActionCreator';
import { increaseIndex, decreaseIndex, resetIndex } from '../../actions/store'
import { store } from '../../store';
import { amountStore, ERRORTOAST } from '../../constants/fixedValues';
import { setTotalNumberOfProducts } from '../../actions/business';

const mapDispatchToProps = (dispatch, ownProps) => {
  const { toastManager } = ownProps;

  return {
    getStoreProducts: (index) => {
      //call the action creator to dispatch the products getter
      dispatch(resetIndex())
      businessActionCreator.getTotalStoreProduct()
      .then((total)=>{
        dispatch(setTotalNumberOfProducts(total))
      })
      .catch((err)=>{
        toastManager.add(err, ERRORTOAST);
      })
      businessActionCreator.getStoreProducts(amountStore, index)
      .then((action)=>{
        dispatch(action)
      })
      .catch((err)=>{
        toastManager.add(err, ERRORTOAST);
      })
    },
    increaseIndex: () => {
      dispatch(increaseIndex())
      businessActionCreator.getStoreProducts(amountStore, store.getState().index)
      .then((action)=>{
        dispatch(action)
      })
      .catch((err)=>{
        toastManager.add(err, ERRORTOAST);
      })
    },
    decreaseIndex: () => {
      dispatch(decreaseIndex())
      businessActionCreator.getStoreProducts(amountStore, store.getState().index)
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
    storeProducts: state.storeProducts,
    searchProduct: state.searchProduct,
    index: state.index,
    totalStoreProduct: state.totalStoreProduct
  }
}

const StoreContainer = connect(mapStateToProps, mapDispatchToProps)(Store);

export default withToastManager(StoreContainer);
