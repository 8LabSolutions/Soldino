import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import Button from '../presentational/Button';
import authentication from "../../facade/authentication"
import { beginLoading, endLoading } from '../../actions/login';
import { SUCCESSTOAST, ERRORTOAST } from '../../constants/fixedValues';

const mapDispatchToProps = (dispatch, ownProps) => {
  const { toastManager } = ownProps;
  return {
    action: (parametersArray) => {
      dispatch(beginLoading())
      authentication.addUser(...parametersArray).then(()=>{
        toastManager.add("Registration completed. Now you can login and start using Soldino.", SUCCESSTOAST)
        dispatch(endLoading())
      })
      .catch((err)=>{
        console.log(err)
        //dispatch the error message
        toastManager.add(err, ERRORTOAST)
        dispatch(endLoading())
      })
    }
  }
}

const ButtonSignUp = connect(null, mapDispatchToProps)(Button);

export default withToastManager(ButtonSignUp);
