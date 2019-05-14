import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import Store from '../presentational/Store';
import businessActionCreator from '../../actionsCreator/businessActionCreator';
import { increaseIndex, decreaseIndex, resetIndex } from '../../actions/store'
import { store } from '../../store';
import { amountStore, ERRORTOAST } from '../../constants/fixedValues';
import { setTotalNumberOfProducts } from '../../actions/business';

/**
 * @description map the getStoreProducts, increaseIndex, decreaseIndex action into the Store component
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  const { toastManager } = ownProps;
  return {
    /**
     * @description Get a fixed number of products, the amountStore is set in ../../constants/fixedValues
     * @param {*} index: first product position is amountStore*index
     */
    getStoreProducts: (index) => {
      //call the action creator to dispatch the products getter
      dispatch(resetIndex())
      businessActionCreator.getTotalStoreProduct()
      .then((total)=>{
        //success
        dispatch(setTotalNumberOfProducts(total))
      })
      .catch((err)=>{
        //error
        toastManager.add(err, ERRORTOAST);
      })
      businessActionCreator.getStoreProducts(amountStore, index)
      .then((action)=>{
        //success
        dispatch(action)
      })
      .catch((err)=>{
        //error
        toastManager.add(err, ERRORTOAST);
      })
    },

    /**
     * @description increase the index for getting products.
     */
    increaseIndex: () => {
      dispatch(increaseIndex())
      businessActionCreator.getStoreProducts(amountStore, store.getState().index)
      .then((action)=>{
        //success
        dispatch(action)
      })
      .catch((err)=>{
        //error
        toastManager.add(err, ERRORTOAST);
      })
    },

    /**
     * @description decrease the index for getting products.
     */
    decreaseIndex: () => {
      dispatch(decreaseIndex())
      businessActionCreator.getStoreProducts(amountStore, store.getState().index)
      .then((action)=>{
        //success
        dispatch(action)
      })
      .catch((err)=>{
        //error
        toastManager.add(err, ERRORTOAST);
      })
    }
  }
}

/**
 * @description map the storeProducts, searchProduct, index, totalStoreProduct state value into the Store component
 * @param {*} state
 */
const mapStateToProps = (state) => {
  return {
    storeProducts: state.storeProducts,
    searchProduct: state.searchProduct,
    index: state.index,
    totalStoreProduct: state.totalStoreProduct
  }
}

/**
 * @description connect the state and the action to the Store props
 */
const StoreContainer = connect(mapStateToProps, mapDispatchToProps)(Store);

export default withToastManager(StoreContainer);
