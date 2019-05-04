import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import { logIn, logOut } from '../../actions/login';
import Button from '../presentational/Button';
import { store } from "../../store/index";
import authentication from "../../facade/authentication"
import history from '../../store/history'
import { ERRORTOAST, SUCCESSTOAST } from '../../constants/fixedValues';


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
const mapDispatchToProps = (dispatch, ownProps) => {
  const { toastManager } = ownProps;
  return {
    action: () => {

      //get the object if user exists
      authentication.userLogin()
      .then((user)=>{
        let action = (store.getState().logged === false) ? logIn(user) : logOut();
        let message = (store.getState().logged === false) ? "Welcome back "+user.name+"!" : "See you soon";
        dispatch(action)

        //starting listening for account chages
        authentication.listenForChanges()
        .then(()=>{
          dispatch(logOut())
          history.push('/')
        })
        toastManager.add(message, SUCCESSTOAST);
        history.push('/')
      })
      .catch((error) => {
        toastManager.add(error, ERRORTOAST);
      })
    }
  }
}


/**
 * @description connect the state and action to the Button props
 */
const ButtonAuth = connect(mapStateToProps, mapDispatchToProps)(Button);

export default withToastManager(ButtonAuth);
