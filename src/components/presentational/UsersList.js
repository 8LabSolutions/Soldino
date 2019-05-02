/* eslint-disable react/jsx-one-expression-per-line */
import React, {Component} from 'react';
import NavBar from './NavBar'
import { checkGovernment } from '../../auxiliaryFunctions';
import { amountUser, defaultIndex } from '../../constants/fixedValues';
import SearchContainer from '../containers/SearchContainer';

class UsersList extends Component {

  componentWillMount(){
    const {getUserList, resetSearch} = this.props;
    resetSearch();
    getUserList(amountUser, defaultIndex);
    //alert("MOUNT")
  }

  render() {
    if(checkGovernment()===false){window.location.href = "/"}
    //need to check if user type is government, else redirect to home like previous line
    let list;
    let searchList = [];
    var {printUser, userList} = this.props;
    let {searchProduct} = this.props;
    let pushed = false;
    if(userList!== undefined && userList.length>0){
      for(let i=0; i< userList.length; i++){
        pushed = false
        if(userList[i].name.toUpperCase().includes(searchProduct.toUpperCase()) && pushed===false){
          searchList = [...searchList, userList[i]];
          pushed = true
        }
        if(userList[i].email.toUpperCase().includes(searchProduct.toUpperCase()) && pushed===false){
          searchList = [...searchList, userList[i]];
          pushed = true
        }
        if(userList[i].address.toUpperCase().includes(searchProduct.toUpperCase()) && pushed===false){
          searchList = [...searchList, userList[i]];
          pushed = true
        }
        if(userList[i].streetName.toUpperCase().includes(searchProduct.toUpperCase()) && pushed===false){
          searchList = [...searchList, userList[i]];
          pushed = true
        }
        if(userList[i].district.toUpperCase().includes(searchProduct.toUpperCase()) && pushed===false){
          searchList = [...searchList, userList[i]];
          pushed = true
        }
        if(userList[i].postCode.toUpperCase().includes(searchProduct.toUpperCase()) && pushed===false){
          searchList = [...searchList, userList[i]];
          pushed = true
        }
        if(userList[i].surname!==undefined && pushed===false){
          if(userList[i].surname.toUpperCase().includes(searchProduct.toUpperCase())){
            searchList = [...searchList, userList[i]];
            pushed = true
          }
        }
        if(userList[i].VATnumber!==undefined && pushed===false){
          if(userList[i].VATnumber.toUpperCase().includes(searchProduct.toUpperCase())){
            searchList = [...searchList, userList[i]];
            pushed = true
          }
        }
      }
      list = searchList.map(i => printUser(i));
    }
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-sm-12 userlist-margin">
              <SearchContainer />
              <ul className="list-group list-group-flush">
                {list}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UsersList;
