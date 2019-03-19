import React, {Component} from 'react';
import NavBar from './NavBar'
import { store } from "../../store/index";

class TransactionsManager extends Component {
  render() {
    if(store.getState().logged === false){window.location.href = "/"}
    return (
      <div>
        <NavBar />
        <h1>TransactionsManager</h1>
      </div>
    )
  }
}
export default TransactionsManager;