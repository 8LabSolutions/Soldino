import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import Button from '../presentational/Button';
import governmentActionCreator from "../../actionsCreator/governmentActionCreator"
import history from '../../store/history'
import { CITIZEN } from '../../constants/actionTypes';
import { beginLoading, endLoading } from '../../actions/login';
import { ERRORTOAST, SUCCESSTOAST } from '../../constants/fixedValues';

/**
 * @description map the changeState action into the Button component
 * @param {*} dispatch
 * @param {*} ownProps
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  const { toastManager } = ownProps;
  let redirectUrl
  (ownProps.type===CITIZEN) ? redirectUrl="/userslist" : redirectUrl="/businesslist"
  return {
    /**
     * @description change the state of a specific user
     */
    action: () => {
      dispatch(beginLoading())
      governmentActionCreator.changeUserState(ownProps.address, ownProps.state, ownProps.type)
      .then((action)=>{
        dispatch(action)
        toastManager.add("User state changed successfully.", SUCCESSTOAST)
        dispatch(endLoading())
        history.push(redirectUrl)
      })
      .catch((err)=>{
        toastManager.add(err, ERRORTOAST)
        dispatch(endLoading())
      })
    }
  }
}

/**
 * @description connect the action to the Button props
 */
const ButtonState = connect(null, mapDispatchToProps)(Button);

export default withToastManager(ButtonState);
