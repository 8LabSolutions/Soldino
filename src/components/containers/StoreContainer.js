/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Store from '../presentational/Store';

const mapStateToProps = (state) => {
  return {
    searchProduct: state.searchProduct
  }
}

const StoreContainer = connect(mapStateToProps, null)(Store);

export default StoreContainer;
