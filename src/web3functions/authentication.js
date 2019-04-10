import web3util from "./web_util";
import ContractManager from "../contracts_build/ContractManager"
import UserLogic from "../contracts_build/UserLogic"

const userHandler = (async function() {
  var web3 = await web3util.getWeb3();
  var contractManagerInstance;
  var userLogicInstance;
  web3.eth.net.getId().then((id)=>{
    contractManagerInstance = new web3.eth.Contract(ContractManager.abi,
      ContractManager.networks[id].address);
    contractManagerInstance.methods.getContractAddress("UserLogic").call()
    .then((_userLogicAddress)=>{
      userLogicInstance = new web3.eth.Contract(UserLogic.abi, _userLogicAddress);
    });
  })

  return {
    addCitizen: async function(hash) {
      let [hashIpfs, hashSize, hashFun] = await web3util.splitIPFSHash(hash);
      return web3.eth.getAccounts().then((account)=>{
        return userLogicInstance.methods.addCitizen(hashIpfs, hashSize, hashFun).send({from: account[0]});
      })
    },
    addBusiness:async function(hash) {
      let [hashIpfs, hashSize, hashFun] = await web3util.splitIPFSHash(hash);
      return web3.eth.getAccounts().then((account)=>{
        return userLogicInstance.methods.addBusiness(hashIpfs, hashSize, hashFun).send({from: account[0]});
      })
    },
    getUser: function() {
      return web3.eth.getAccounts().then((account)=>{
        return userLogicInstance.methods.getUserInfo(account[0]).call().then((ris)=>{
          var hashIPFS = ris[0];
          var hashFun = ris[1];
          var hashSize = ris[2];
          return web3util.recomposeIPFSHash(hashIPFS, hashSize, hashFun);
        });
      })
    }
  }
}());

export default userHandler;

