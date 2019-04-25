/* eslint-disable react/jsx-one-expression-per-line */
import React, {Component} from 'react';
import NavBar from './NavBar'
import { checkGovernment } from '../../auxiliaryFunctions';
import { amountUser, defaultIndex } from '../../constants/fixedValues';

class UsersList extends Component {

  componentWillMount(){
    const {getUserList} = this.props;
    getUserList(amountUser, defaultIndex);
    //alert("MOUNT")
  }

  render() {
    if(checkGovernment()===false){window.location.href = "/"}
    //need to check if user type is government, else redirect to home like previous line
    var list;
    var {printUser, userList} = this.props;
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
