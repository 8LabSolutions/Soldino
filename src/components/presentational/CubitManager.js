import React, {Component} from 'react';
import { store } from "../../store/index";
import FormCubitManagerContainer from '../containers/FormCubitManagerContainer';

class CubitManager extends Component {
  render() {
    if(store.getState().logged === false || store.getState().user.userType !== "GOVERNMENT"){window.location.href = "/"}
    //need to check if user type is government, else redirect to home like previous line
    return (
      <FormCubitManagerContainer />
    )
  }
}

export default CubitManager;
