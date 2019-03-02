import { connect } from 'react-redux';
import { logIn, logOut } from '../../actions/login';

import LogButton from '../presentational/LogButton';

const mapStateToProps = (state) => {
  return {
    logged: state.logged
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (log) => {
      dispatch(logIn(log))
    },
    logOut: (log) => {
      dispatch(logOut(log))
    }
  }
}

const BtnLog = connect(mapStateToProps, mapDispatchToProps)(LogButton);

export default BtnLog;
