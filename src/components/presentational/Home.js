import React, {Component} from 'react';
import NavBar from './NavBar';
import FormRegistration from './FormRegistration';
import Store from './Store';
import { store } from "../../store/index";
import CubitManager from './CubitManager';

class Home extends Component {
  render() {
    let dynamicHome
    if(store.getState().logged === false){
      dynamicHome = <FormRegistration />
    }else if(store.getState().userType === "Govern"){
      dynamicHome = <CubitManager />
    }else{
      dynamicHome = <Store />
    }
    return (
      <div>
        <NavBar />
        {dynamicHome}
      </div>
    )
  }
}
export default Home;