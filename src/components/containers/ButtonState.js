/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import Button from '../presentational/Button';
import governmentActionCreator from "../../actionsCreator/governmentActionCreator"

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    action: () => {
      governmentActionCreator.changeUserState(ownProps.address, ownProps.state)
      .then((action)=>{
        dispatch(action)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }
}

const mapStateToProps = (state, props) => {
  var text;
  if(props.state === true)
    text = "Disable"
  else
    text = "Enable"
  return {
    text: props.state.toString()
  }
}

const ButtonState = connect(mapStateToProps, mapDispatchToProps)(Button);

export default ButtonState;
