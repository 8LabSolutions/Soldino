import web3util from "./web_util";
import ContractManager from "../contracts_build/ContractManager"
import UserLogic from "../contracts_build/UserLogic"

const userHandler = (async function() {
  var web3 = web3util.getWeb3();
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
    addCitizen: function(hash) {
      let hashFun, hashSize, hashIpfs = web3util.splitIPFSHash(hash);
      return userLogicInstance.addCitizen(hashIpfs, hashSize, hashFun).send({gas: 4712388});
    },
    addBusiness: function(hash) {
      let hashFun, hashSize, hashIpfs = web3util.splitIPFSHash(hash);
      return userLogicInstance.addBusiness(hashIpfs, hashSize, hashFun).send({gas: 4712388});
    },
    getUser: function(address) {
      return userLogicInstance.getUserInfo(address).call().then((hashIPFS, hashFun, hashSize)=>{
        return web3util.recomposeIPFSHash(hashFun, hashSize, hashIPFS);
      });
    }
  }
}());

export default userHandler;

