import { connect } from 'react-redux';
import { searchaction } from '../../actions/searchaction';
import Search from '../presentational/Search';

/**
 * @description map the searchProduct state value into the Search component
 * @param {*} state
 */
const mapStateToProps = (state) => {
  return {
    searchProduct: state.searchProduct
  }
}

/**
 * @description map the search action into the Search component
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch) => {
  return {
    /**
     * @description Search for a product.
     * @param {*} str to seatch
     */
    action: (str) => {
      dispatch(searchaction(str))
    }
  }
}

/**
 * @description connect the state and the action to the Search props
 */
const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchContainer;
