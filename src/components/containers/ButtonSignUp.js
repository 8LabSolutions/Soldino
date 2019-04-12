/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import authentication from "../../facade/authentication"


const mapDispatchToProps = () => {
  return {
    action: (parametersArray) => {
      console.log(parametersArray)
      authentication.addUser(...parametersArray).then((ris)=>{
        //window.location = "/successregistration"
      })
      .catch(console.log)

    }
  }
}

const ButtonSignUp = connect(null, mapDispatchToProps)(Button);

export default ButtonSignUp;
