import { connect } from 'react-redux';
import { logIn, logOut } from '../../actions/login';
import Button from '../presentational/Button';
import { store } from "../../store/index";

const mapStateToProps = (state) => {
  return {
    logged: state.logged
  }
}

const mapDispatchToProps = (dispatch) => {
  var action;
  if(store.getState().logged === false){
    action = logIn()
  }else{
    action = logOut()
  }
  return {
    action: () => {
      dispatch(action)
      window.location.reload();
    }
  }
}

const ButtonAuth = connect(mapStateToProps, mapDispatchToProps)(Button);

export default ButtonAuth;