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
    }else if(store.getState().user.userType === "GOVERNMENT"){
      dynamicHome = <CubitManager />
    }else{
      dynamicHome = <StoreContainer />
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
