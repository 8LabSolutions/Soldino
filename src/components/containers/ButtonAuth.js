import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import { logIn, logOut } from '../../actions/login';
import Button from '../presentational/Button';
import { store } from "../../store/index";
import authentication from "../../facade/authentication"
import history from '../../store/history'
import { ERRORTOAST, SUCCESSTOAST, INFOTOAST, DIDYOUKNOWTOAST } from '../../constants/fixedValues';
import { didYouKnowThat } from '../../auxiliaryFunctions';


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
      let id = null;
      let id2 = null;
      if(store.getState().logged === false){
        //logged out
        toastManager.add("IPFS' connection may take a while, please wait until you are logged in.", INFOTOAST, (x)=>{id=x});
        toastManager.add(didYouKnowThat(), DIDYOUKNOWTOAST, (x)=>{id2=x})
      }
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
        if(id !== null) toastManager.remove(id);
        if(id2 !== null) toastManager.remove(id2)
        toastManager.add(message, SUCCESSTOAST);
        history.push('/')
      })
      .catch((error) => {
        if(id !== null) toastManager.remove(id);
        if(id2 !== null) toastManager.remove(id2)
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
