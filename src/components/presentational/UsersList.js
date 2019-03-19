/* eslint-disable react/jsx-one-expression-per-line */
import React, {Component} from 'react';
import NavBar from './NavBar'
import { store } from "../../store/index";
import Button from './Button';

class UsersList extends Component {
  render() {
    if(store.getState().logged === false || store.getState().userType !== "Govern"){window.location.href = "/"}
    //need to check if user type is government, else redirect to home like previous line
    let name = "userName"
    let surname = "userSurname"
    let type = "Citizen"
    let email = "userEmail"
    let address = "userAddress"
    return (
      <div>
        <NavBar />
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Type: </strong>{type}< br/>
            <strong>Name: </strong>{name}< br/>
            <strong>Surname: </strong>{surname}< br/>
            <strong>Email: </strong>{email}< br/>
            <strong>Address: </strong>{address}< br/>
            <Button text="Disable" />
          </li>
          <li className="list-group-item">
            <strong>Type: </strong>{type}< br/>
            <strong>Name: </strong>{name}< br/>
            <strong>Surname: </strong>{surname}< br/>
            <strong>Email: </strong>{email}< br/>
            <strong>Address: </strong>{address}< br/>
            <Button text="Disable" />
          </li>
          <li className="list-group-item">
            <strong>Type: </strong>{type}< br/>
            <strong>Name: </strong>{name}< br/>
            <strong>Surname: </strong>{surname}< br/>
            <strong>Email: </strong>{email}< br/>
            <strong>Address: </strong>{address}< br/>
            <Button text="Disable" />
          </li>
          <li className="list-group-item">
            <strong>Type: </strong>{type}< br/>
            <strong>Name: </strong>{name}< br/>
            <strong>Surname: </strong>{surname}< br/>
            <strong>Email: </strong>{email}< br/>
            <strong>Address: </strong>{address}< br/>
            <Button text="Disable" />
          </li>
        </ul>
      </div>
    )
  }
}

export default UsersList;