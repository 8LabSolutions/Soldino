/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import governmentActionCreator from "../../actionsCreator/governmentActionCreator"
import history from '../../store/history'
import { CITIZEN } from '../../constants/actionTypes';

const mapDispatchToProps = (dispatch, ownProps) => {
  let redirectUrl
  (ownProps.type===CITIZEN) ? redirectUrl="/userslist" : redirectUrl="/businesslist"
  return {
    action: () => {
      governmentActionCreator.changeUserState(ownProps.address, ownProps.state, ownProps.type)
      .then((action)=>{
        dispatch(action)
        history.push(redirectUrl)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }
}

const ButtonState = connect(null, mapDispatchToProps)(Button);

export default ButtonState;
