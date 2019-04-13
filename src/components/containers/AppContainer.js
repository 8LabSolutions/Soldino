/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import App from '../../App'

const mapStateToProps = (state) => {
  return {
    loading: state.loading
  }
}

const AppContainer = connect(mapStateToProps, null)(App);

export default AppContainer;
