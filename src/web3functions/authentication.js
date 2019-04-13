import web3util from "./web_util";
import ContractManager from "../contracts_build/ContractManager"
import UserLogic from "../contracts_build/UserLogic"

const web3authentication = (async function() {
  var web3;
  var contractManagerInstance;
  var userLogicInstance;

  function initialize(){
    return new Promise((resolve, reject) =>{
      web3util.getWeb3().then((_web3)=>{
        web3 = _web3;
        web3.eth.net.getId().then((id)=>{
          contractManagerInstance = new web3.eth.Contract(ContractManager.abi,
            ContractManager.networks[id].address);
          return contractManagerInstance.methods.getContractAddress("UserLogic").call()
          .then((_userLogicAddress)=>{
            userLogicInstance = new web3.eth.Contract(UserLogic.abi, _userLogicAddress);
            resolve();
          });
        }).catch(()=>{
          reject("Not able to find any account in MetaMask");
        })
      }).catch((err)=>{
        reject(err)
      })
    })
  }

  return {
    addCitizen: function(hash) {
      return new Promise((resolve)=>{
        initialize().then(async () =>{
          let [hashIpfs, hashSize, hashFun] = await web3util.splitIPFSHash(hash);
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
        initialize().then(async () =>{
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
        initialize().then(()=>{
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

