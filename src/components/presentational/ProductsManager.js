import React, {Component} from 'react';
import NavBar from './NavBar'
import { store } from "../../store/index";
import Button from "./Button";

class ProductsManager extends Component {
  render() {
    if(store.getState().logged === false){window.location.href = "/"}
    return (
      <div>
        <NavBar />
        <h1>ProductsManager</h1>
        <Button text="dddd" />
      </div>
    )
  }
}
export default ProductsManager;
