/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-wrap-multilines */
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import ButtonAuth from '../containers/ButtonAuth';
import { store } from "../../store/index";
import UserInfoContainer from '../containers/UserInfoContainer';


class NavBar extends Component {
  render() {
    let products = store.getState().cart.length;
    let authText;
    let navLinks
    if (store.getState().logged === true && store.getState().user.userType === "GOVERNMENT"){
      authText = 'Logout'
      navLinks =  <div className="navbar-nav navbar-items">
                    <NavLink exact className="nav-item nav-link" to="/">Cubit Manager</NavLink>
                    <NavLink className="nav-item nav-link" to="/userslist">Users List</NavLink>
                    <NavLink className="nav-item nav-link" to="/businesslist">Business List</NavLink>
                    <NavLink className="nav-item nav-link" to="/vatrefund">VAT Refund</NavLink>
                  </div>
    }else if (store.getState().logged === true && store.getState().user.userType === "CITIZEN"){
      authText = 'Logout'
      navLinks =  <div className="navbar-nav navbar-items">
                    <UserInfoContainer />
                    <NavLink exact className="nav-item nav-link" to="/">Store</NavLink>
                    <NavLink className="nav-item nav-link" to="/orders">Orders</NavLink>
                    {/*<NavLink className="nav-item nav-link" to="/purchasesconfirmation">Purchases confirmation</NavLink>*/}
                    <NavLink className="nav-item nav-link material-icons" to="/cart">shopping_cart</NavLink>
                    <span className="badge badge-light">{products}</span>
                  </div>
    }else if (store.getState().logged === true && store.getState().user.userType === "BUSINESS"){
      authText = 'Logout'
      navLinks =  <div className="navbar-nav navbar-items">
                    <UserInfoContainer />
                    <NavLink exact className="nav-item nav-link" to="/">Store</NavLink>
                    <NavLink className="nav-item nav-link" to="/orders">Orders</NavLink>
                    {/*<NavLink className="nav-item nav-link" to="/purchasesconfirmation">Purchases confirmation</NavLink>*/}
                    <NavLink className="nav-item nav-link" to="/productsmanager">Products Manager</NavLink>
                    <NavLink className="nav-item nav-link" to="/transactionsmanager">Transactions Manager</NavLink>
                    <NavLink className="nav-item nav-link material-icons" to="/cart">shopping_cart</NavLink>
                    <span className="badge badge-light">{products}</span>
                  </div>
    }else{
      authText = 'Login'
      navLinks = null;
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" id="burger" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <NavLink className="nav-item nav-link material-icons" to="/"><img alt="Logo" id="logo" src="logo.png" /></NavLink>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          {navLinks}
        </div>
        <span id="logButton">
          <ButtonAuth text={authText}  />
        </span>
      </nav>
    )
  }
}

export default NavBar;
