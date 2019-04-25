/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Store from '../presentational/Store';
import businessActionCreator from '../../actionsCreator/businessActionCreator';
import { increaseIndex, decreaseIndex, resetIndex } from '../../actions/store'
import { store } from '../../store';
import { amountStore } from '../../constants/fixedValues';
import { setTotalNumberOfProducts } from '../../actions/business';

const mapDispatchToProps = (dispatch) => {
  //should dispatch the action that fills the store with the first 50 users
  //*!!! maybe only the first time !!!*/
  return {
    getStoreProducts: (index) => {
      //call the action creator to dispatch the products getter
      dispatch(resetIndex())
      businessActionCreator.getTotalStoreProduct().then((total)=>{dispatch(setTotalNumberOfProducts(total))})
      businessActionCreator.getStoreProducts(amountStore, index).then((action)=>{
        dispatch(action)
      })
    },
    increaseIndex: () => {
      dispatch(increaseIndex())
      businessActionCreator.getStoreProducts(amountStore, store.getState().index).then((action)=>{
        dispatch(action)
      })
    },
    decreaseIndex: () => {
      dispatch(decreaseIndex())
      businessActionCreator.getStoreProducts(amountStore, store.getState().index).then((action)=>{
        dispatch(action)
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

export default StoreContainer;
