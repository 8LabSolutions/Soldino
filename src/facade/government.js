import web3government from "../web3functions/government"
import ipfsModule from "../ipfsCalls/index"


const government = (function(){
  return {
    /**
     * @description Enable the passed account
     * @param {} userAddress account address to be enabled
     */
    enableAccount: function(userAddress){
      return new Promise((resolve)=>{
        web3government.enableAccount(userAddress).then(resolve);
      })
    },

    /**
     * @description Disabled the passed account
     * @param {} userAddress account address to be disabled
     */
    disableAccount: function(userAddress){
      return new Promise((resolve)=>{
        web3government.disableAccount(userAddress).then(resolve);
      })
    },

    mint: function(amount){
      return new Promise((resolve)=>{
        web3government.mint(amount).then(resolve);
      })
    },

    distribute: function(amount, address){

      if(address.length > 1){
        console.log('è un array')
        return new Promise((resolve)=>{
          web3government.distributeToMultipleAddresses(address, amount).then(resolve);
        })
      }
      else{
        return new Promise((resolve)=>{
          web3government.distribute(amount, address[0]).then(resolve);
        })
      }
    },

    refundVAT: function(businessAddress, period){
      return new Promise((resolve)=>{
        web3government.refundVAT(businessAddress, period).then(resolve);
      })
    },
    /**
     * @description return an array of JSON to display the citizen info to the government:
     * name, surname, email, address, state
     * @param {*} amount number of citizen
     * @param {*} index skipping the first index*amount citizen
     */
    getCitizenList: function(amount, index = 0){
      return new Promise((resolve)=>{
        web3government.getUserList(1, amount, index).then((resultsArray)=>{
          //resultsArray content: array with 0:address, 1: hashIPFS, 2: userState (dis/able)
          var citizensJSON = [];
          for(let i = 0; i < resultsArray.length; i++){
            citizensJSON.push(new Promise((resolve)=>{
              ipfsModule.getJSONfromHash(resultsArray[i][1]).then(resolve)
            }))
          }

          var citizens = [];
          //get all the citizen JSON
          Promise.all(citizensJSON)
          .then((results)=>{
            for(let i = 0; i < results.length; i++){
              citizens.push({
                name: results[i].name,
                surname: results[i].surname,
                email: results[i].email,
                address: resultsArray[i][0],
                state: resultsArray[i][2],
                district: results[i].district,
                postCode: results[i].postCode,
                streetName: results[i].streetName,
                streetNumber: results[i].streetNumber
              })
            }
            resolve(citizens)
          })
        })
      })
    },

    getBusinessList: function(amount, index = 0){
      return new Promise((resolve)=>{
        web3government.getUserList(2, amount, index).then((resultsArray)=>{
          //resultsArray content: array with 0:address, 1: hashIPFS, 2: userState (dis/able)

          var businessJSON = [];
          for(let i = 0; i < resultsArray.length; i++){
            businessJSON.push(new Promise((resolve)=>{
              ipfsModule.getJSONfromHash(resultsArray[i][1]).then(resolve)
            }))
          }
          var business = [];
          //get all the citizen JSON
          Promise.all(businessJSON)
          .then((results)=>{
            for(let i = 0; i < results.length; i++){
              console.log(results[i])
              business.push({
                name: results[i].name,
                VATnumber: results[i].VATnumber,
                email: results[i].email,
                address: resultsArray[i][0],
                state: resultsArray[i][2],
                district: results[i].district,
                postCode: results[i].postCode,
                streetName: results[i].streetName,
                streetNumber: results[i].streetNumber
              })
            }
            resolve(business)
          })
        })
      })
    },

    getTotalCubit: function(){
      return new Promise((resolve)=>{
        web3government.getTotalCubit().then(resolve)
      })
    }
  }
}());

export default government;
