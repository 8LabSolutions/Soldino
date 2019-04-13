import web3util from "./web_util";
import ProductLogic from "../contracts_build/ProductLogic"

const web3business = (function(){
  var web3;
  function initialize(){
    return new Promise((resolve, reject) =>{
      web3util.getWeb3().then((_web3)=>{
        web3 = _web3;
        //get the instance of the contratc and resolves it
        web3util.getContractInstance(web3, ProductLogic).then(resolve)
      }).catch((err)=>{
        reject(err)
      })
    })
  }

  return {
    addProduct: function(hash, vatPercentage, netPrice) {
      return new Promise((resolve)=>{
        initialize().then(async (productLogicInstance) =>{
          let [hashIpfs, hashSize, hashFun] = await web3util.splitIPFSHash(hash)
          web3.eth.getAccounts().then((account)=>{
            console.log('---parametri---')
            console.log(hashIpfs)
            console.log(hashSize)
            console.log(hashFun)
            console.log(vatPercentage)
            console.log(netPrice*100)
            productLogicInstance.methods.addProduct(
              hashIpfs, hashSize, hashFun, vatPercentage, netPrice*100)
            .send({from: account[0]})
            .then(()=>{
              resolve();
            })
          })
        })
      })
    },

    getProductHash: function(remainingHash){
      return new Promise((resolve)=>{
        initialize().then((productLogicInstance)=>{
          productLogicInstance.methods.getProductCid(remainingHash).call().then((ris)=>{
            var hashIPFS = ris[0];
            var hashFun = ris[1];
            var hashSize = ris[2];
            resolve(web3util.recomposeIPFSHash(hashIPFS, hashSize, hashFun));
          });

        })
      })
    },

    getSenderProducts: function() {
      return new Promise((resolve)=>{
        initialize().then(async (productLogicInstance) =>{
          web3.eth.getAccounts().then((account)=>{
            productLogicInstance.getPastEvents('ProductInserted', {
              filter: {_seller: account[0]},
              fromBlock: 0,
              toBlock: 'latest'
            })
            .then((events) => {
                console.log(events)
                resolve()
            });
          })
        })
      })
    }

  }
}());

export default web3business;
