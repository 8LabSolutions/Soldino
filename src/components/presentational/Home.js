import React, {Component} from 'react';
import NavBar from './NavBar';
import FormRegistration from './FormRegistration';
import StoreContainer from '../containers/StoreContainer';
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
      dynamicHome = <StoreContainer />
    }
    return (
      <div>
        <NavBar />
        <h1>Welcome to Soldino</h1>
        {dynamicHome}
      </div>
    )
  }
}
export default Home;
