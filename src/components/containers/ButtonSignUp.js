import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import Button from '../presentational/Button';
import authentication from "../../facade/authentication"
import { beginLoading, endLoading } from '../../actions/login';
import { SUCCESSTOAST, ERRORTOAST } from '../../constants/fixedValues';
import { setLoadingMessage } from '../../actions/user';


/**
 * @description map the signUp action into the Button component
 * @param {*} dispatch
 * @param {*} ownProps
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  const { toastManager } = ownProps;
  return {
    /**
     * @description Write data into IPFS with user info.
     * @param {*} parametersArray: user info as:
     *  case of BUSINESS [userType, email, headquarter, headquarter number, district, postCode, company name, company VAT number]
     *  case of CITIZEN [userType, email, address, house number, district, postCode, name, surname]
     */
    action: (parametersArray) => {
      //check if the fields are void
      let voidValue = [];
      for(let i=0; i<parametersArray.length; i++) {
        voidValue[i] = false
        if(parametersArray[i]===""){
          voidValue[i] = true
        }
      }
      if(voidValue[0]===false &&
         voidValue[1]===false &&
         voidValue[2]===false &&
         voidValue[3]===false &&
         voidValue[4]===false &&
         voidValue[5]===false &&
         voidValue[6]===false &&
         voidValue[7]===false){
           //continue only if fields are not void
        dispatch(setLoadingMessage("We are activating your account. Please wait some minutes (miners!)"))
        dispatch(beginLoading())
        //let id2;
        //toastManager.add(didYouKnowThat(), DIDYOUKNOWTOAST, (x)=>{id2=x})
        authentication.addUser(...parametersArray).then(()=>{
          //success
          //toastManager.remove(id2)
          toastManager.add("Registration completed. Now you can login and start using Soldino.", SUCCESSTOAST)
          dispatch(endLoading())
        })
        .catch((err)=>{
          //error
          //toastManager.remove(id2)
          toastManager.add(err, ERRORTOAST)
          dispatch(endLoading())
        })
      }else{
        //show toast with missed field
        let params
        (parametersArray[0]==="BUSINESS")
        ? params = ["", "email", "headquarter", "headquarter number", "district", "postcode", "company name", "VAT number"]
        : params = ["", "email", "address", "house number", "district", "postcode", "name", "surname"]
        for(let i=0; i<voidValue.length; i++) {
          if(voidValue[i]===true){
            toastManager.add("You missed your "+params[i]+".", ERRORTOAST)
          }
        }
      }
    }
  }
}

/**
 * @description connect the action to the Button props
 */
const ButtonSignUp = connect(null, mapDispatchToProps)(Button);

export default withToastManager(ButtonSignUp);
