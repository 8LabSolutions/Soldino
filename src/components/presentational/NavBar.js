/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-wrap-multilines */
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import ButtonAuth from '../containers/ButtonAuth';
import { store } from "../../store/index";


class NavBar extends Component {
  render() {
    let authText;
    let navLinks
    if (store.getState().logged === true){
      authText = 'Logout'
      navLinks =  <div className="navbar-nav">
                    <NavLink className="nav-item nav-link" to="/">Store</NavLink>
                    <NavLink className="nav-item nav-link" to="/government">Government</NavLink>
                    <NavLink className="nav-item nav-link material-icons" to="/cart">shopping_cart</NavLink>
                  </div>
    }else{
      authText = 'Login'
      navLinks = null;
    }
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand">Soldino</span>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          {navLinks}
        </div>
        <ButtonAuth text={authText} />
      </nav>
    )
  }
}

export default NavBar;