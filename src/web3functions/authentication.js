import web3util from "./web_util";
import ContractManager from "../contracts_build/ContractManager"
import UserLogic from "../contracts_build/UserLogic"

const userHandler = (async function() {
  var web3;
  var contractManagerInstance;
  var userLogicInstance;

  async function initialize(){
    var ris = await web3util.getWeb3();
    console.log(ris[0])
    if(ris[0]==true){
      web3 = ris[1];
    }
    else{
      console.log('errore')
      console.log(ris[1]);
      return false;
    }
    return web3.eth.net.getId().then((id)=>{
      contractManagerInstance = new web3.eth.Contract(ContractManager.abi,
        ContractManager.networks[id].address);
      return contractManagerInstance.methods.getContractAddress("UserLogic").call()
      .then((_userLogicAddress)=>{
        userLogicInstance = new web3.eth.Contract(UserLogic.abi, _userLogicAddress);
        return true;
      });
    })
  }

  return {
    addCitizen: async function(hash) {
      initialize().then(async (ris)=>{
        if(ris===true){
          let [hashIpfs, hashSize, hashFun] = await web3util.splitIPFSHash(hash);
          return web3.eth.getAccounts().then((account)=>{
            return userLogicInstance.methods.addCitizen(hashIpfs, hashSize, hashFun).send({from: account[0]});
          })
        }
        else{
          console.log('ritornato falso')
        }

      })

    },
    addBusiness:async function(hash) {
      await initialize();
      let [hashIpfs, hashSize, hashFun] = await web3util.splitIPFSHash(hash);
      return web3.eth.getAccounts().then((account)=>{
        return userLogicInstance.methods.addBusiness(hashIpfs, hashSize, hashFun).send({from: account[0]});
      })
    },
    getUser: async function() {
      await initialize();
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

