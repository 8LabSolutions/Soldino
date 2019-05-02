import { connect } from 'react-redux';
import { searchaction } from '../../actions/searchaction';
import Search from '../presentational/Search';

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
