/* eslint-disable no-unused-vars */
//file containing all the functions for logging-in and
//signing-up
import  web3util from "./web_util";
import ContractManager from "../contracts_build/ContractManager"
import CitizenStorage from "../contracts_build/CitizenStorage"
import UserLogic from "../contracts_build/UserLogic"


//return the web3 instance
var web3 = web3util.getWeb3();
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

const registerUser = function(userType, email, streetName, streetNumber, district, postCode, name, details){
  //istantiate the necessary costracts and returns the results
  var contractManagerInstance;
  //var citizenStorageInstance;

  contractManagerInstance = new web3.eth.Contract(ContractManager.abi,
    ContractManager.networks[ContractManager.network_id].address);
  contractManagerInstance.methods.getContractAddress("UserLogic").call()
  .then((_userLogicAddress)=>{
    //userLogicInstance = new web3.eth.Contract(UserLogic.abi,
      //_userLogicAddress);
  })

  if (userType === "CITIZEN"){
    //register the new citizen

  }
  else if (userType === "BUSINESS"){
    //register the new business
    alert(email)
  }

  return true;
  //different registartions based on the userType
}

export default registerUser;

