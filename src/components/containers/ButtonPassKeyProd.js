/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import { passKeyProd } from '../../actions/business';

const mapDispatchToProps = (dispatch) => {
  return {
    action: (product) => {
      dispatch(passKeyProd(product))
    }
  }
}

const ButtonPassKeyProd = connect(null, mapDispatchToProps)(Button);

export default ButtonPassKeyProd;
