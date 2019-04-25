import web3authentication from "../web3functions/authentication"
import ipfsModule from "../ipfsCalls/index"

const authentication = (function(){
  return{
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
    addUser: async function(userType, email, streetName, streetNumber, district, postCode, name, details){
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
        return new Promise((resolve)=>{
          ipfsModule.insertJSONintoIPFS(newCitizenJSON).then(async (hash)=>{
            //splitting the hash in three parts to save them into the blockchain
            //console.log(hash+' inserted')
            web3authentication.addCitizen(hash).then(resolve)
          })
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
        console.log(newBusinessJSON)
        //insert the json into ipfs
        return new Promise((resolve)=>{
          ipfsModule.insertJSONintoIPFS(newBusinessJSON).then(async (hash)=>{
            //splitting the hash in three parts to save them into the blockchain
            web3authentication.addBusiness(hash).then(resolve)
          })
        })
      }
      //different registartions based on the userType
    },

    userLogin: function() {
      return new Promise((resolve, reject)=>{
        //getUser returns: hashIPFS, state, userType
        web3authentication.getUser().then(([hashIPFS, state, userType])=>{
          //drop if the user is disabled
          if(state === false)
            reject("the account is disabled, please call the offices to get more infos");
          //if the government is logging in, there's no need to call IPFS
          if(userType == 3){
            var governmentJSON = {
              userType: "GOVERNMENT",
              name: "Government",
              email: "government@soldino.com"
            }
            resolve(governmentJSON);
          }
          else {
            //get the user Info
            ipfsModule.getJSONfromHash(hashIPFS).then(resolve)
          }
        })
      })
    }
  }
}());


export default authentication;

