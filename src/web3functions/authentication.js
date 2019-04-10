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
    addCitizen: function(hash) {
      let ris = web3util.splitIPFSHash(hash);
      return web3.eth.getAccounts().then((account)=>{
        console.log(hash)
        return userLogicInstance.methods.addCitizen(String(web3.utils.fromAscii((ris[2]))), ris[1], ris[0]).send({from: account[0]});
      })
    },
    addBusiness: function(hash) {
      let hashFun, hashSize, hashIpfs = web3util.splitIPFSHash(hash);
      return userLogicInstance.methods.addBusiness(hashIpfs, hashSize, hashFun).send({gas: 4712388});
    },
    getUser: function(address) {
      return userLogicInstance.methods.getUserInfo(address).call().then((hashIPFS, hashFun, hashSize)=>{
        return web3util.recomposeIPFSHash(hashFun, hashSize, hashIPFS);
      });
    }
  }
}());

export default userHandler;

