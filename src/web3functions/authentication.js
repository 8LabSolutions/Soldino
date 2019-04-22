import web3util from "./web_util";
import UserLogic from "../contracts_build/UserLogic"

const web3authentication = (function() {
  //initialize web3
  web3util.init();

  return {
    addCitizen: function(hash) {
      return new Promise((resolve)=>{
        web3util.getContractInstance(UserLogic).then((userLogicInstance) =>{
          let [hashIpfs, hashSize, hashFun] = web3util.splitIPFSHash(hash)
          web3util.getCurrentAccount().then((account)=>{
            userLogicInstance.methods.addCitizen(hashIpfs, hashSize, hashFun).send({from: account})
            .then(resolve)
          })
        })
      })
    },
    addBusiness: function(hash) {
      return new Promise((resolve)=>{
        web3util.getContractInstance(UserLogic).then((userLogicInstance) =>{
          let [hashIpfs, hashSize, hashFun] = web3util.splitIPFSHash(hash);
          web3util.getCurrentAccount().then((account)=>{
            userLogicInstance.methods.addBusiness(hashIpfs, hashSize, hashFun).send({from: account})
            .then(resolve)
          })
        })
      })
    },
    getUser: async function() {
      return new Promise((resolve)=>{
        web3util.getContractInstance(UserLogic).then((userLogicInstance)=>{
          web3util.getCurrentAccount().then((account)=>{
            userLogicInstance.methods.getUserInfo(account).call().then((ris)=>{
              var hashIPFS = ris[0];
              var hashFun = ris[1];
              var hashSize = ris[2];
              var state = ris[3];
              var type = ris[4];
              resolve([web3util.recomposeIPFSHash(hashIPFS, hashSize, hashFun), state, type]);
            });
          })
        })
      })
    }
  }
}());

export default web3authentication;

