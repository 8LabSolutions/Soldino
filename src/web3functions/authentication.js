import web3util from "./web_util";
import UserLogic from "../contracts_build/UserLogic"

const web3authentication = (function() {
  //initialize web3
  web3util.init();

  return {

    /**
     * @description Listens for an account or network change and returns if
     * one of them happen
     */
    listenForChanges: function(){
      return new Promise((resolve)=>{
        window.ethereum.on('accountsChanged', function(){resolve()})
        window.ethereum.on('networkChanged', function(){resolve()})
      })
    },
    /**
     * @returns Promise: resolve if the registration process succeded,
     *  otherwise reject with an error
     * @param {*} hash IPFS hash containing all the data of the new citizen
     */
    addCitizen: function(hash) {
      return new Promise((resolve, reject)=>{
        web3util.getContractInstance(UserLogic)
        .then((userLogicInstance) =>{
          let [hashIpfs, hashSize, hashFun] = web3util.splitIPFSHash(hash)
          web3util.getCurrentAccount()
          .then((account)=>{
            userLogicInstance.methods.addCitizen(hashIpfs, hashSize, hashFun)
            .send({from: account})
            .then(resolve)
            .catch(()=>{
              reject("error during the registration of a new citizen, there is a problem with Web3 API");
            })
          })
          .catch(reject)
        })
        .catch(reject)
      })
    },
     /**
     * @returns Promise: resolve if the registration process succeded,
     *  otherwise reject with an error
     * @param {*} hash IPFS hash containing all the data of the new business
     */
    addBusiness: function(hash) {
      return new Promise((resolve,reject)=>{
        web3util.getContractInstance(UserLogic)
        .then((userLogicInstance) =>{
          let [hashIpfs, hashSize, hashFun] = web3util.splitIPFSHash(hash);
          web3util.getCurrentAccount()
          .then((account)=>{
            userLogicInstance.methods.addBusiness(hashIpfs, hashSize, hashFun)
            .send({from: account})
            .then(resolve)
            .catch(()=>{
              reject("error during the registration of a new business, there is a problem with Web3 API");
            })
          })
          .catch(reject)
        })
        .catch(reject)
      })
    },
    /**
     * @returns Return the following information about the given address:
     *  1) IPFShash
     *  2) state(boolean able disable)
     *  3) type (0 => not registred, 1=> citizen, 2=> business, 3=> government)
     * @param {*} address Address you want to know datas
     */
    getUser: async function(address = undefined) {
      return new Promise((resolve, reject)=>{
        web3util.getContractInstance(UserLogic)
        .then(async (userLogicInstance)=>{
          if (address === undefined){
            address = await web3util.getCurrentAccount()
          }
          userLogicInstance.methods.getUserInfo(address).call()
          .then((ris)=>{
            var hashIPFS = ris[0];
            var hashFun = ris[1];
            var hashSize = ris[2];
            var state = ris[3];

            var type = ris[4];
            resolve([web3util.recomposeIPFSHash(hashIPFS, hashSize, hashFun), state, type]);
          })
          .catch(()=>{
            reject("The user seems not to be registered")
          })
        })
        .catch(reject)
      })
    }
  }
}());

export default web3authentication;

