/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';

const mapDispatchToProps = (dispatch) => {
  return {
    action: () => {
      
    }
  }
}

const ButtonBusinessProduct = connect(null, mapDispatchToProps)(Button);

export default ButtonBusinessProduct;
