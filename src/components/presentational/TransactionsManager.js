import React, {Component} from 'react';
import NavBar from './NavBar'
import { store } from "../../store/index";

class TransactionsManager extends Component {
  render() {
    if(store.getState().logged === false){window.location.href = "/"}
    return (
      <div>
        <NavBar />
        <h3>Transactions Manager</h3>
      </div>
    )
  }
}
export default TransactionsManager;