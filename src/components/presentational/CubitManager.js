import React, {Component} from 'react';
import { store } from "../../store/index";
import FormCubitManager from './FormCubitManager';

class CubitManager extends Component {
  render() {
    if(store.getState().logged === false || store.getState().userType !== "Govern"){window.location.href = "/"}
    //need to check if user type is government, else redirect to home like previous line
    return (
      <FormCubitManager />
    )
  }
}

export default CubitManager;