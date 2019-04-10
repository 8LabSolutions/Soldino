/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import { addUser } from "../../facade/authentication"


const mapDispatchToProps = () => {
  return {
    action: (parametersArray) => {
      console.log(parametersArray)
      addUser(...parametersArray).then((ris)=>{
        window.location = "/successregistration"
      }).catch(()=>{
        window.location = "/errorregistration"
      })

    }
  }
}

const ButtonSignUp = connect(null, mapDispatchToProps)(Button);

export default ButtonSignUp;
