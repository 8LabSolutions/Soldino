import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import ProductsManager from '../presentational/ProductsManager';
import businessActionCreator from '../../actionsCreator/businessActionCreator';
import { increaseIndex, decreaseIndex, resetIndex } from '../../actions/store';
import { amountStore, ERRORTOAST } from '../../constants/fixedValues';
import { store } from '../../store';
import { setTotalNumberOfMyProducts } from '../../actions/business';


/**
 * @description map the getProductsList, increaseIndex and decreaseIndex action into the ProductsManager component
 * @param {*} dispatch
 * @param {*} ownProps
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  const { toastManager } = ownProps;
  return {
    /**
     * @description Get a fixed number of products, the amountStore is set in ../../constants/fixedValues
     * @param {*} index: first product position is amountStore*index
     */
    getProductsList: (index)=> {
      //call the action creator to dispatch the products getter
      dispatch(resetIndex())
      businessActionCreator.getTotalStoreProduct()
      .then((total)=>{
        //success
        dispatch(setTotalNumberOfMyProducts(total))
      })
      .catch((err)=>{
        //error
        toastManager.add(err, ERRORTOAST);
      })
      businessActionCreator.getMyProducts(amountStore, index)
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
      businessActionCreator.getMyProducts(amountStore, store.getState().index)
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
      businessActionCreator.getMyProducts(amountStore, store.getState().index)
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
 * @description map the myProductsArray, index and totalMyProduct state value into the ProductsManager component
 * @param {*} state
 */
const mapStateToProps = (state) => {
  return {
    myProductsArray: state.myProductsArray,
    index: state.index,
    totalMyProduct: state.totalMyProduct
  }
}

/**
 * @description connect the state and the action to the ProductsManager props
 */
const ProductManagerContainer = connect(mapStateToProps, mapDispatchToProps)(ProductsManager);

export default withToastManager(ProductManagerContainer);
