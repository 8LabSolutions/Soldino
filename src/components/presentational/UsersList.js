/* eslint-disable react/jsx-one-expression-per-line */
import React, {Component} from 'react';
import NavBar from './NavBar'
import { store } from "../../store/index";

class UsersList extends Component {

  constructor(props){
    super(props)
    this.state = {
      userList: props.userList
    }
  }

  componentWillMount(){
    const {getUserList} = this.props;
    getUserList(50,0);
    //alert("MOUNT")
  }

  render() {
    //da spostare nel container

    if(store.getState().logged === false || store.getState().user.userType !== "GOVERNMENT"){window.location.href = "/"}
    //need to check if user type is government, else redirect to home like previous line
    var list;
    var {printUser} = this.props;
    var {userList} = this.state;
    if(userList!== undefined && userList.length>0)
      list = userList.map(i => printUser(i));
    return (
      <div>
        <NavBar />
        <ul className="list-group list-group-flush top-2rem">
          {list}
        </ul>
      </div>
    )
  }
}

export default UsersList;
