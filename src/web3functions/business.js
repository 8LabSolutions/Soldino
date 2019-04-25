import web3util from "./web_util";
import ProductLogic from "../contracts_build/ProductLogic"

const web3business = (function(){

  //initializing web3
  web3util.init()

  return {
    addProduct: function(hash, vatPercentage, netPrice) {
      return new Promise((resolve)=>{
        web3util.getContractInstance(ProductLogic).then((productLogicInstance) =>{
          let [hashIpfs, hashSize, hashFun] = web3util.splitIPFSHash(hash)
          web3util.getCurrentAccount().then((account)=>{
            productLogicInstance.methods.addProduct(
              hashIpfs, hashSize, hashFun, vatPercentage, netPrice*web3util.TOKENMULTIPLIER)
            .send({from: account})
            .then(() => {
              console.log("business web3 fun: prodotto inserito net e vat")
              productLogicInstance.methods.getProductNetPrice(hashIpfs).call()
              .then(console.log)
              .then(resolve)
            })
          })
        })
      })
    },

    modifyProduct: function(key, newHash, newVatPercentage, newNetPrice){
      return new Promise((resolve)=>{
        web3util.getContractInstance(ProductLogic).then((productLogicInstance) =>{
          let [hashIpfs, hashSize, hashFun] = web3util.splitIPFSHash(newHash)
          web3util.getCurrentAccount().then((account)=>{
            productLogicInstance.methods.modifyProduct(
              key, hashIpfs, hashSize, hashFun, newVatPercentage, newNetPrice*web3util.TOKENMULTIPLIER)
            .send({from: account})
            .then(resolve)
          })
        })
      })
    },

    deleteProduct: function(key){
      return new Promise((resolve)=>{
        web3util.getContractInstance(ProductLogic).then((productLogicInstance)=>{
          web3util.getCurrentAccount().then((account)=>{
            productLogicInstance.methods.deleteProduct(key)
            .send({from: account})
            .then(resolve)
          })
        })
      })
    },

    /**
     * @description Returns the full IPFS hash starting from the remaining hash
     * @param {} remainingHash  remaining part of the splitted ipfs hash
     *
     */
    getProductHash: function(remainingHash){
      return new Promise((resolve)=>{
        web3util.getContractInstance(ProductLogic).then((productLogicInstance)=>{
          productLogicInstance.methods.getProductCid(remainingHash).call().then((ris)=>{
            var hashIPFS = ris[0];
            var hashFun = ris[1];
            var hashSize = ris[2];
            resolve(web3util.recomposeIPFSHash(hashIPFS, hashSize, hashFun));
          });

        })
      })
    },
    /**
     *
     * @param {*} amount
     * @param {*} index
     * @param {*} sender
     */

    getTotalProducts : function(sender=false){
      return new Promise((resolve)=>{
        web3util.getContractInstance(ProductLogic).then((productLogicInstance) =>{
          web3util.getCurrentAccount().then((account)=>{
            // preparing the query
            var query;
            if (sender === true){
              query = {
                //filtering by the seller (only sender products)
                filter: {_seller: account},
                fromBlock: 0,
                toBlock: 'latest'
              }
            } else {
              query = {
                fromBlock: 0,
                toBlock: 'latest'
              }
            }
            //array containing the inserted products
            var products = [];
            //array containing the deleted products
            var deleted = [];
            //array containing the updated products
            //firstly get the inserted products from the logs
            productLogicInstance.getPastEvents('ProductInserted', query)
            .then((events) => {
              for (let i = 0; i < events.length; i++){
                //extracting only the hash
                products.push(events[i].returnValues._keyHash)
              }
            })
            .then(()=>{
              //getting the deleted products
              productLogicInstance.getPastEvents('ProductDeleted', query)
              .then((eventsDeleted) => {
                for (let i =0; i<eventsDeleted.length; i++){
                  //extracting only the hash
                  deleted.push(eventsDeleted[i].returnValues._keyHash)
                }
                // removing the deleted products from the array
                let filtered = products.filter(function(value){
                  return !(deleted.includes(value))
                })
                products = filtered;
              })
              .then(()=>{
                resolve(products.length)
              })
            })
          })
        })
      })
    },


    getProducts: function(amount, index, sender=false) {
      return new Promise((resolve)=>{
        web3util.getContractInstance(ProductLogic).then((productLogicInstance) =>{
          web3util.getCurrentAccount().then((account)=>{
            // preparing the query
            var query;
            if (sender === true){
              query = {
                //filtering by the seller (only sender products)
                filter: {_seller: account},
                fromBlock: 0,
                toBlock: 'latest'
              }
            } else {
              query = {
                fromBlock: 0,
                toBlock: 'latest'
              }
            }
            //array containing the inserted products
            var products = [];
            //array containing the deleted products
            var deleted = [];
            //array containing the updated products
            var updated = [];
            //array containing the new hash of the updated products
            var updatedNewValue = [];
            //firstly get the inserted products from the logs
            productLogicInstance.getPastEvents('ProductInserted', query)
            .then((events) => {
              let start = index*amount;
              for (let i = start; i < start + amount && i < events.length; i++){
                //extracting only the hash
                products.push(events[i].returnValues._keyHash)
              }
            })
            .then(()=>{
              //getting the deleted products
              productLogicInstance.getPastEvents('ProductDeleted', query)
              .then((eventsDeleted) => {
                for (let i =0; i<eventsDeleted.length; i++){
                  //extracting only the hash
                  deleted.push(eventsDeleted[i].returnValues._keyHash)
                }
                // removing the deleted products from the array
                let filtered = products.filter(function(value){
                  return !(deleted.includes(value))
                })
                products = filtered;
              })
              .then(()=>{
                productLogicInstance.getPastEvents('ProductModified', query)
                .then((eventsUpdate)=>{
                  //getting the updated products
                  if(eventsUpdate!== undefined){
                    for (let i = 0; i < eventsUpdate.length; i++){
                      //saving the old hash and the new hash
                      updated.push(eventsUpdate[i].returnValues._keyHash);
                      updatedNewValue.push(eventsUpdate[i].returnValues._newHashIPFS);
                    }
                    //updating the old products with the new hash
                    for (let i = 0; i < updated.length; i++ ){
                      for (let j = 0; j < products.length; j++){
                        if(products[j]===updated[i]){
                          products[j] = updatedNewValue[i];
                        }
                      }
                    }
                    //now products contains only the last version of the seller's products
                    //finally, get the products CID from web3 and converting it in base58
                    var promises = [];
                    for(let i = 0; i < products.length; i++){
                      promises.push(
                        new Promise((resolve)=>{
                          this.getProductHash(products[i]).then((ipfsHash)=>{
                          resolve([products[i], ipfsHash])
                        })
                      }))
                    }
                    //resolves all the products values
                    Promise.all(promises).then((ris)=>{
                      resolve(ris)
                    })
                  }
                })
              })
            })
          })
        })
      })
    },



  }
}());

export default web3business;
