import React, {Component} from 'react';
import NavBar from './NavBar'
import { store } from "../../store/index";

class Orders extends Component {
  render() {
    if(store.getState().logged === false){window.location.href = "/"}
    return (
      <div>
        <NavBar />
        <h1>Orders</h1>
      </div>
    )
  }
}
export default Orders;