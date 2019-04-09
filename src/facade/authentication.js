import userHandler from "../web3functions/authentication"
import ipfsModule from "../ipfsCalls/index"

/**
 * @description return a promise about the registration of the user
 * @param {*} userType
 * @param {*} email
 * @param {*} streetName
 * @param {*} streetNumber
 * @param {*} district
 * @param {*} postCode
 * @param {*} name
 * @param {*} details
 */
const addUser = function(userType, email, streetName, streetNumber, district, postCode, name, details){
  //istantiate the necessary costracts and returns the results
  if(userType === "CITIZEN") {
    var newCitizenJSON = {
      userType: userType,
      email: email,
      name: name,
      surname: details,
      streetName: streetName,
      streetNumber: streetNumber,
      district: district,
      postCode: postCode
    }
    //insert the json into ipfs
    return ipfsModule.insertJSONintoIPFS(newCitizenJSON).then((hash)=>{
      //splitting the hash in three parts to save them into the blockchain
      return userHandler.addCitizen(hash);
    })
  }

  else if(userType === "BUSINESS") {
    var newBusinessJSON = {
      userType: userType,
      email: email,
      name: name,
      VATnumber: details,
      streetName: streetName,
      streetNumber: streetNumber,
      district: district,
      postCode: postCode
    }
    //insert the json into ipfs
    return ipfsModule.insertJSONintoIPFS(newBusinessJSON).then((hash)=>{
      //splitting the hash in three parts to save them into the blockchain
      return userHandler.addBusiness(hash);
    })
  }
  //different registartions based on the userType
};

const userLogin = function(address) {
  //get the hash from web3
  userHandler.getUser(address).then((hashIPFS)=>{
   //get the user Info
   return ipfsModule.getJSONfromHash(hashIPFS);
 })
}

export {addUser, userLogin};

