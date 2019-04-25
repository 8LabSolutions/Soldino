/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import governmentActionCreator from "../../actionsCreator/governmentActionCreator"
import history from '../../store/history'
import { CITIZEN } from '../../constants/actionTypes';
import { beginLoading, endLoading } from '../../actions/login';

const mapDispatchToProps = (dispatch, ownProps) => {
  let redirectUrl
  (ownProps.type===CITIZEN) ? redirectUrl="/userslist" : redirectUrl="/businesslist"
  return {
    action: () => {
      dispatch(beginLoading())
      governmentActionCreator.changeUserState(ownProps.address, ownProps.state, ownProps.type)
      .then((action)=>{
        dispatch(action)
        dispatch(endLoading())
        history.push(redirectUrl)
      })
      .catch((err)=>{
        console.log(err)
        dispatch(endLoading())
      })
    }
  }
}

const ButtonState = connect(null, mapDispatchToProps)(Button);

export default ButtonState;
