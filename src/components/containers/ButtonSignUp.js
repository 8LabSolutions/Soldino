/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import { addUser } from "../../facade/authentication"


const mapDispatchToProps = () => {
  return {
    action: (parametersArray) => {
      let ris = addUser(...parametersArray);
    }
  }
}

const ButtonSignUp = connect(null, mapDispatchToProps)(Button);

export default ButtonSignUp;
