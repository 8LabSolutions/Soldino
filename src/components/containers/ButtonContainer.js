import { connect } from 'react-redux';
import { logIn, logOut } from '../../actions/login';
import Button from '../presentational/Button';
import { history } from '../../App'


const mapStateToProps = (state) => {
  return {
    logged: state.logged
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (log) => {
      dispatch(logIn(log))
      history.push('/government');
      //history.go(0)
      window.location.reload();
    },
    logOut: (log) => {
      dispatch(logOut(log))
      history.push('/');
      //history.go(0)
      window.location.reload();
    }
  }
}

const ButtonContainer = connect(mapStateToProps, mapDispatchToProps)(Button);

export default ButtonContainer;