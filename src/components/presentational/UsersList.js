/* eslint-disable react/jsx-one-expression-per-line */
import React, {Component} from 'react';
import NavBar from './NavBar'
import { store } from "../../store/index";
import ButtonGeneric from '../containers/ButtonGeneric';

class UsersList extends Component {
  printUser(user) {
    if(user[0] === "Citizen"){  //check type of user
      return (
        <li className="list-group-item">
          <strong>Type: </strong>{user[0]}<br />
          <strong>Name: </strong>{user[1]}<br />
          <strong>Surname: </strong>{user[2]}<br />
          <strong>Email: </strong>{user[3]}<br />
          <strong>Address: </strong>{user[4]}<br />
          <ButtonGeneric text="Disable" />
        </li>
      )
    }else{
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
    }
  }

  render() {
    if(store.getState().logged === false || store.getState().userType !== "Govern"){window.location.href = "/"}
    //need to check if user type is government, else redirect to home like previous line
    let totalUser = 500
    let name
    let surname
    let type
    let email
    let address
    var user
    var usersArray = []
    for(var i=0; i<totalUser; i++){
      name = "userName"
      surname = "userSurname"
      type = "Citizen"
      email = "userEmail"
      address = "userAddress"
      user = [type, name, surname, email, address]
      usersArray[i] = user;
    }

    return (
      <div>
        <NavBar />
        <ul className="list-group list-group-flush">
          {usersArray.map(i => this.printUser(i))
          }
        </ul>
      </div>
    )
  }
}

export default UsersList;
