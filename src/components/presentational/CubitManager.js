import React, {Component} from 'react';
import FormCubitManagerContainer from '../containers/FormCubitManagerContainer';
import { checkGovernment } from '../../auxiliaryFunctions';

class CubitManager extends Component {
  render() {
    //need to check if user type is government, else redirect to home like previous line
    return (
      <FormCubitManagerContainer />
    )
  }
}

export default CubitManager;
