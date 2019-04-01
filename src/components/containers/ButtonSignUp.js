/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import registerUser from "../../web3functions/authentication"


const mapDispatchToProps = () => {
  return {
    action: (parametersArray) => {
      let ris = registerUser(...parametersArray);
    }
  }
}

const ButtonSignUp = connect(null, mapDispatchToProps)(Button);

export default ButtonSignUp;
