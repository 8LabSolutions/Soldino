/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import { searchaction } from '../../actions/searchaction';
import Search from '../presentational/Search';
import { store } from "../../store/index";

const mapStateToProps = (state) => {
  return {
    searchProduct: state.searchProduct
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    action: (str) => {
      dispatch(searchaction(str))
    }
  }
}

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchContainer;
