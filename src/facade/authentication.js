import web3authentication from "../web3functions/authentication"
import ipfsModule from "../ipfsCalls/index"
import web3user from "../web3functions/user"

const authentication = (function(){
  return{
    /**
     * @description return a promise that resolves if the registration of the user went well,
     * otherwise reject with an error
     * @param {*} userType
     * @param {*} email
     * @param {*} streetName
     * @param {*} streetNumber
     * @param {*} district
     * @param {*} postCode
     * @param {*} name
     * @param {*} details
    */
    addUser: function(userType, email, streetName, streetNumber, district, postCode, name, details){
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
        return new Promise((resolve, reject)=>{
          ipfsModule.insertJSONintoIPFS(newCitizenJSON)
          .then((hash)=>{
            //splitting the hash in three parts to save them into the blockchain
            web3authentication.addCitizen(hash)
            .then(resolve)
            .catch(reject)
          })
          .catch(reject)
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
        return new Promise((resolve, reject)=>{
          ipfsModule.insertJSONintoIPFS(newBusinessJSON)
          .then((hash)=>{
            //splitting the hash in three parts to save them into the blockchain
            web3authentication.addBusiness(hash)
            .then(resolve)
            .catch(reject)
          })
          .catch(reject)
        })
      }
      //different registartions based on the userType
    },

    /**
     * @description REturns a promise that resolves with the user info if the user is registered,
     * otherwise reject with an error
     */
    userLogin: function() {
      return new Promise((resolve, reject)=>{
        //getUser returns: hashIPFS, state, userType
        web3authentication.getUser()
        .then(([hashIPFS, state, userType])=>{
          //drop if the user is disabled
          if(state === false)
            reject("the account is disabled, please call the offices to get more infos");
          //if the government is logging in, there's no need to call IPFS
          if(parseInt(userType) === 3){
            var governmentJSON = {
              userType: "GOVERNMENT",
              name: "Government",
              email: "government@soldino.com"
            }
            resolve(governmentJSON);
          }
          else {
            ipfsModule.getJSONfromHash(hashIPFS)
            .then((ris)=>{
              ris.state = state;
              web3user.getBalance()
              .then((balance)=>{
                ris.balance = balance
                resolve(ris)
              })
              .catch(reject)
            })
            .catch(reject)
          }
        })
        .catch(reject)
      })
    },
    /**
     * @description Listens for an account or network change and returns if
     * one of them happen
     */
    listenForChanges: function(){
      return new Promise((resolve, reject)=>{
        web3authentication.listenForChanges()
        .then(resolve)
        .catch(reject)
      })
    }
  }
}());


export default authentication;

