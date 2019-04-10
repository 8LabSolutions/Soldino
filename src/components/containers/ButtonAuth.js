/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import { logIn, logOut, logBusiness, logCitizen, logGovern } from '../../actions/login';
import Button from '../presentational/Button';
import { store } from "../../store/index";
import authentication from "../../facade/authentication"

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
      authentication.userLogin().then((ris, err)=>{
        console.log(ris)
        console.log(err)
      }).catch(console.log)
      //swith sul type dello user (diversi dispatch) : paramentro oggetto JSON
      //dispatch dell'azione di login/logout


    }
  }
}

const ButtonAuth = connect(mapStateToProps, mapDispatchToProps)(Button);

export default ButtonAuth;
