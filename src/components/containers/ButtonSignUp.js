import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import Button from '../presentational/Button';
import authentication from "../../facade/authentication"
import { beginLoading, endLoading } from '../../actions/login';
import { SUCCESSTOAST, ERRORTOAST } from '../../constants/fixedValues';

const mapDispatchToProps = (dispatch, ownProps) => {
  const { toastManager } = ownProps;
  return {
    action: (parametersArray) => {
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
        dispatch(beginLoading())
        authentication.addUser(...parametersArray).then(()=>{
          toastManager.add("Registration completed. Now you can login and start using Soldino.", SUCCESSTOAST)
          dispatch(endLoading())
        })
        .catch((err)=>{
          console.log(err)
          //dispatch the error message
          toastManager.add(err, ERRORTOAST)
          dispatch(endLoading())
        })
      }else{
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

const ButtonSignUp = connect(null, mapDispatchToProps)(Button);

export default withToastManager(ButtonSignUp);
