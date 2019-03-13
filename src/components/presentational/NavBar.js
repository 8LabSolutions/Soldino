/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-wrap-multilines */
import React, {Component} from 'react';
import ButtonAuth from '../containers/ButtonAuth';
import { store } from "../../store/index";

class NavBar extends Component {
  render() {
    let authText;
    let navLinks
    if (store.getState().logged === true){
      authText = 'Logout'
      navLinks =  <div className="navbar-nav">
                    <a className="nav-item nav-link" href="/">Store</a>
                    <a className="nav-item nav-link" href="/government">Government</a>
                    <a className="nav-item nav-link material-icons" href="/cart">shopping_cart</a>
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