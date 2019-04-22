/* eslint-disable react/jsx-one-expression-per-line */
import React, {Component} from 'react';
import NavBar from './NavBar'
import { store } from "../../store/index";
import ButtonGeneric from '../containers/ButtonGeneric';

class UsersList extends Component {


  componentWillMount(){
    const {getUserList} = this.props;
    getUserList(50,0);
  }

  printUser(user) {
    //if(user.userType === "CITIZEN"){  //check type of user
      return (
        <li className="list-group-item">
          <strong>Type: </strong>{user.userType}<br />
          <strong>Name: </strong>{user.name}<br />
          <strong>Surname: </strong>{user.surname}<br />
          <strong>Email: </strong>{user.email}<br />

          <ButtonGeneric text="Disable" />
        </li>
      )
    /*}else{
      return (
        <li className="list-group-item">
          <strong>Type: </strong>{user[0]}<br />
          <strong>Company name: </strong>{user[1]}<br />
          <strong>VAT number: </strong>{user[2]}<br />
          <strong>Headquarters: </strong>{user[3]}<br />
          <strong>Email: </strong>{user[4]}<br />
          <ButtonGeneric text="Disable" />
        </li>
      )
    }*/
  }

  render() {
    if(store.getState().logged === false || store.getState().user.userType !== "GOVERNMENT"){window.location.href = "/"}
    //need to check if user type is government, else redirect to home like previous line
    var {userList} = this.props;
    return (
      <div>
        <NavBar />
        <ul className="list-group list-group-flush">
          {userList.map(i => this.printUser(i))}
        </ul>
      </div>
    )
  }
}

export default UsersList;
