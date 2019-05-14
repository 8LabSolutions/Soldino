import { connect } from 'react-redux';
import UserInfo from '../presentational/UserInfo';

/**
 * @description map the user, logged state value into the UserInfo component
 * @param {*} state
 */
const mapStateToProps = (state) => {
  return {
    user: state.user,
    logged: state.logged
  }
}

/**
 * @description connect the state to the UserInfo props
 */
const UserInfoContainer = connect(mapStateToProps, null)(UserInfo);

export default UserInfoContainer;
