/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';

const mapDispatchToProps = () => {
  return {
    action: () => {
      return null
    }
  }
}

const ButtonGeneric = connect(null, mapDispatchToProps)(Button);

export default ButtonGeneric;
