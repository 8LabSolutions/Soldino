/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import authentication from "../../facade/authentication"
import history from '../../store/history'


const mapDispatchToProps = () => {
  return {
    action: (parametersArray) => {
      authentication.addUser(...parametersArray).then(()=>{
        history.push('/successregistration')
      })
      .catch((err)=>{
        console.log(err)
        //dispatch the error message
        history.push('/errorregistration')
      })

    }
  }
}

const ButtonSignUp = connect(null, mapDispatchToProps)(Button);

export default ButtonSignUp;
