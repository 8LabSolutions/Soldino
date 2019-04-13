import web3util from "./web_util";
import UserLogic from "../contracts_build/UserLogic"

const web3authentication = (function() {
  var web3;

  function initialize(){
    return new Promise((resolve, reject) =>{
      web3util.getWeb3().then((_web3)=>{
        web3 = _web3;
        //get the instance of the contratc and resolves it
        web3util.getContractInstance(web3, UserLogic).then(resolve)
      }).catch((err)=>{
        reject(err)
      })
    })
  }

  return {
    addCitizen: function(hash) {
      return new Promise((resolve)=>{
        initialize().then(async (userLogicInstance) =>{
          let [hashIpfs, hashSize, hashFun] = await web3util.splitIPFSHash(hash)
          web3.eth.getAccounts().then((account)=>{
            userLogicInstance.methods.addCitizen(hashIpfs, hashSize, hashFun).send({from: account[0]})
            .then(()=>{
              resolve();
            })
          })
        })
      })
    },
    addBusiness: function(hash) {
      return new Promise((resolve)=>{
        initialize().then(async (userLogicInstance) =>{
          let [hashIpfs, hashSize, hashFun] = await web3util.splitIPFSHash(hash);
          web3.eth.getAccounts().then((account)=>{
            userLogicInstance.methods.addBusiness(hashIpfs, hashSize, hashFun).send({from: account[0]})
            .then(()=>{
              resolve();
            })
          })
        })
      })
    },
    getUser: async function() {
      return new Promise((resolve)=>{
        initialize().then((userLogicInstance)=>{
          web3.eth.getAccounts().then((account)=>{
            userLogicInstance.methods.getUserInfo(account[0]).call().then((ris)=>{
              var hashIPFS = ris[0];
              var hashFun = ris[1];
              var hashSize = ris[2];
              resolve(web3util.recomposeIPFSHash(hashIPFS, hashSize, hashFun));
            });
          })
        })
      })
    }
  }
}());

export default web3authentication;

