/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import { logIn, logOut, logBusiness, logCitizen, logGovern } from '../../actions/login';
import Button from '../presentational/Button';
import { store } from "../../store/index";
import authentication from "../../facade/authentication"
import history from '../../store/history'

const mapStateToProps = (state) => {
  return {
    logged: state.logged
  }
}

const mapDispatchToProps = (dispatch) => {
  var action = (store.getState().logged === false) ? logIn() : logOut();
  return {
    action: () => {

      //prendere l'oggetto utente se esiste
      authentication.userLogin().then((user)=>{
        console.log('user')
        console.log(user)
      }).catch(console.log)
      //se ris, allora history.push('/')
      //swith sul type dello user (diversi dispatch) : paramentro oggetto JSON
      //dispatch dell'azione di login/logout


    }
  }
}

const ButtonAuth = connect(mapStateToProps, mapDispatchToProps)(Button);

export default ButtonAuth;
