/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import UsersList from '../presentational/UsersList';
import governmentActionCreator from "../../actionsCreator/governmentActionCreator"

const mapDispatchToProps = (dispatch) => {
  //should dispatch the action that fills the store with the first 50 users
  //*!!! maybe only the first time !!!*/
  return {
    getUserList: (amount, index)=> {
      governmentActionCreator.getUserList(amount, index).then((action)=>{
        dispatch(action);
      })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.userList
  }
}

const UserListContainer = connect(mapStateToProps, mapDispatchToProps)(UsersList);

export default UserListContainer;
