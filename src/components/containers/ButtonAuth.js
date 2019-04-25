/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import { logIn, logOut, logBusiness, logCitizen, logGovern } from '../../actions/login';
import Button from '../presentational/Button';
import { store } from "../../store/index";
import authentication from "../../facade/authentication"
import history from '../../store/history'


/**
 * @description map the logged state value into the Button component
 * @param {*} state
 */
const mapStateToProps = (state) => {
  return {
    logged: state.logged
  }
}

/**
 * @description map the logIn/logOut actions into the Button component
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch) => {

  return {
    action: () => {

      //get the object if user exists
      authentication.userLogin().then((user)=>{
        let action = (store.getState().logged === false) ? logIn(user) : logOut();
        dispatch(action)
        history.push('/')
      }).catch((log) => {
        console.log(log)
        history.push('/erroruserdisabled')
      })
      //swith sul type dello user (diversi dispatch) : paramentro oggetto JSON
      //dispatch dell'azione di login/logout


    }
  }
}


/**
 * @description connect the state and action to the Button props
 */
const ButtonAuth = connect(mapStateToProps, mapDispatchToProps)(Button);

export default ButtonAuth;
