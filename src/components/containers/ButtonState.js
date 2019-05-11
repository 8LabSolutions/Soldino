import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import Button from '../presentational/Button';
import governmentActionCreator from "../../actionsCreator/governmentActionCreator"
import history from '../../store/history'
import { CITIZEN } from '../../constants/actionTypes';
import { ERRORTOAST, SUCCESSTOAST, INFOTOAST, DIDYOUKNOWTOAST } from '../../constants/fixedValues';
import { didYouKnowThat } from '../../auxiliaryFunctions';

/**
 * @description map the changeState action into the Button component
 * @param {*} dispatch
 * @param {*} ownProps
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  const { toastManager } = ownProps;
  let redirectUrl
  (ownProps.type===CITIZEN) ? redirectUrl="/userslist" : redirectUrl="/businesslist"
  return {
    /**
     * @description change the state of a specific user
     */

    action: () => {
      //tell the user to wait until the transaction is mined
      let id
      toastManager.add("The status of the user will be changed in few minutes. Once the transaction is mined, you'll receive a confirmation.", INFOTOAST, (x)=>{id=x})
      let id2;
      toastManager.add(didYouKnowThat(), DIDYOUKNOWTOAST, (x)=>{id2=x})
      governmentActionCreator.changeUserState(ownProps.address, ownProps.state, ownProps.type)
      .then((action)=>{
        dispatch(action)
        toastManager.remove(id)
        toastManager.remove(id2)
        toastManager.add("User state changed successfully.", SUCCESSTOAST)
        history.push(redirectUrl)
      })
      .catch((err)=>{
        toastManager.remove(id)
        toastManager.remove(id2)
        toastManager.add(err, ERRORTOAST)
      })
    }
  }
}

/**
 * @description connect the action to the Button props
 */
const ButtonState = connect(null, mapDispatchToProps)(Button);

export default withToastManager(ButtonState);
