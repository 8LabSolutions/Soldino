/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Store from '../presentational/Store';
import businessActionCreator from '../../actionsCreator/businessActionCreator';

const mapDispatchToProps = (dispatch) => {
  //should dispatch the action that fills the store with the first 50 users
  //*!!! maybe only the first time !!!*/
  return {
    getStoreProducts: (amount, index)=> {
      //call the action creator to dispatch the products getter
      businessActionCreator.getStoreProducts(amount, index).then((action)=>{
        dispatch(action)
      })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    storeProducts: state.storeProducts
  }
}

const StoreContainer = connect(mapStateToProps, mapDispatchToProps)(Store);

export default StoreContainer;
