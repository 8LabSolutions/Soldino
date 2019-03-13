import React, {Component} from 'react';
import ButtonAuth from '../containers/ButtonAuth';
import { store } from "../../store/index";

class NavBar extends Component {
  render() {
    let authText = (store.getState().logged === true) ? 'Logout' : 'Login';
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand">Soldino</span>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link" href="/">Home</a>
            <a className="nav-item nav-link" href="/government">Government</a>
            <a className="nav-item nav-link" href="/store">Store</a>
            <a className="nav-item nav-link" href="/other">Other</a>
          </div>
        </div>
        <ButtonAuth text={authText} />
      </nav>
    )
  }
}

export default NavBar;