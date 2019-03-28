/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import { logIn, logOut, logBusiness, logCitizen, logGovern } from '../../actions/login';
import Button from '../presentational/Button';
import { store } from "../../store/index";

const mapStateToProps = (state) => {
  return {
    logged: state.logged
  }
}

const mapDispatchToProps = (dispatch) => {
  var action = (store.getState().logged === false) ? logIn() : logOut();
  return {
    action: () => {
      dispatch(logBusiness())
      dispatch(action)
      window.location.href = "/"
    }
  }
}

const ButtonAuth = connect(mapStateToProps, mapDispatchToProps)(Button);

export default ButtonAuth;
