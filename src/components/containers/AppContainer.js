import { connect } from 'react-redux';
import App from '../../App'

/**
 * @description map the loading and the loading message state value into the App component
 * @param {*} state
 */
const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    loadingMessage: state.loadingMessage
  }
}

/**
 * @description connect the loading state value to the App props
 */
const AppContainer = connect(mapStateToProps, null)(App);

export default AppContainer;
