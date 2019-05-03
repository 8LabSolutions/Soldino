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
    /**
     * @returns Return the following information about the given address:
     *  1) IPFShash
     *  2) state(boolean able disable)
     *  3) type (0 => not registred, 1=> citizen, 2=> business, 3=> government)
     * @param {*} address Address you want to know datas
     */
    getUser: async function(address = undefined) {
      return new Promise((resolve)=>{
        web3util.getContractInstance(UserLogic).then(async (userLogicInstance)=>{
          if (address === undefined){
            address = await web3util.getCurrentAccount()
          }
          userLogicInstance.methods.getUserInfo(address).call().then((ris)=>{
            var hashIPFS = ris[0];
            var hashFun = ris[1];
            var hashSize = ris[2];
            var state = ris[3];
            var type = ris[4];
            resolve([web3util.recomposeIPFSHash(hashIPFS, hashSize, hashFun), state, type]);
          });
        })
      })
    }
  }
}());

export default web3authentication;

