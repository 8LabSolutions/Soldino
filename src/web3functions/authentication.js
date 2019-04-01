//file containing all the functions for logging-in and
//signing-up
import  getWeb3 from "./web_util";

//return the web3 instance
var web3 = getWeb3();
/**
 * @description Registers the new user if possible, or returns false if something went wrong
 * @param {int} userType
 * @param {string} email
 * @param {string} streetName
 * @param {int} streetNumber
 * @param {string} district
 * @param {int} postCode
 * @param {string} name
 * @param {string} details
 * @returns {bool} success
 */
const registerUser = function(userType/*, email, streetName, streetNumber, district, postCode, name, details*/){
  //istantiate the necessary costracts and returns the results
  alert(userType)
  alert(web3)
  return true;
  //different registartions based on the userType
}

export default registerUser;

