/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import authentication from "../../facade/authentication"
import history from '../../store/history'
import { beginLoading, endLoading } from '../../actions/login';


const mapDispatchToProps = (dispatch) => {
  return {
    action: (parametersArray) => {
      dispatch(beginLoading())
      authentication.addUser(...parametersArray).then(()=>{
        dispatch(endLoading())
        history.push('/successregistration')
      })
      .catch((err)=>{
        console.log(err)
        //dispatch the error message
        dispatch(endLoading())
        history.push('/errorregistration')
      })

    }
  }
}

const ButtonSignUp = connect(null, mapDispatchToProps)(Button);

export default ButtonSignUp;
