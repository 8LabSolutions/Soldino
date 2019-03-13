import React, {Component} from 'react';
import NavBar from './NavBar';
import FormRegistration from './FormRegistration';
import Store from './Store';
import { store } from "../../store/index";

class Home extends Component {
  render() {
    let dynamicHome = (store.getState().logged === false) ? <FormRegistration /> : <Store />;
    return (
      <div>
        <NavBar />
        {dynamicHome}
      </div>
    )
  }
}
export default Home;