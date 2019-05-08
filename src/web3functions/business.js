import web3util from "./web_util";
import ProductLogic from "../contracts_build/ProductLogic"
import OrderLogic from "../contracts_build/OrderLogic"
import VatLogic from "../contracts_build/VatLogic"
import { round } from "../auxiliaryFunctions";

const web3business = (function(){

  //initializing web3
  web3util.init()

  return {
    /**
     * @description Add a product that was previously added to IPFS
     * @param {*} hash The IPFS hash
     * @param {*} vatPercentage The VAT fee in percentage applied to the product
     * @param {*} netPrice The net price of the product
     */
    addProduct: function(hash, vatPercentage, netPrice) {
      return new Promise((resolve, reject)=>{
        web3util.getContractInstance(ProductLogic)
        .then((productLogicInstance) =>{
          let [hashIpfs, hashSize, hashFun] = web3util.splitIPFSHash(hash)
          web3util.getCurrentAccount()
          .then((account)=>{
            productLogicInstance.methods.addProduct(
              hashIpfs, hashSize, hashFun, parseInt(round(vatPercentage)), parseInt(round(netPrice*web3util.TOKENMULTIPLIER)))
            .send({from: account})
            .then(resolve)
            .catch(()=>{
              reject("Error adding the new product")
            })
          })
          .catch(reject)
        })
        .catch(reject)
      })
    },

    /**
     * @description Modify a product that was previously added
     * @param {*} key The key of the product
     * @param {*} newHash The new IPFS hash
     * @param {*} newVatPercentage The new VatPercentage hash
     * @param {*} newNetPrice The new NetPrice hash
     */
    modifyProduct: function(key, newHash, newVatPercentage, newNetPrice){
      return new Promise((resolve, reject)=>{
        web3util.getContractInstance(ProductLogic)
        .then((productLogicInstance) =>{
          let [hashIpfs, hashSize, hashFun] = web3util.splitIPFSHash(newHash)
          web3util.getCurrentAccount()
          .then((account)=>{
            productLogicInstance.methods.modifyProduct(
              key, hashIpfs, hashSize, hashFun, parseInt(round(newVatPercentage)), parseInt(round(newNetPrice*web3util.TOKENMULTIPLIER)))
            .send({from: account})
            .then(resolve)
            .catch(()=>{
              reject("Error during the modification of the product")
            })
          })
          .catch(reject)
        })
        .catch(reject)
      })
    },

    /**
     * @description Delete the product corresponding to the key passed
     * @param {*} key The key of the product you want to delete
     */
    deleteProduct: function(key){
      return new Promise((resolve, reject)=>{
        web3util.getContractInstance(ProductLogic)
        .then((productLogicInstance)=>{
          web3util.getCurrentAccount()
          .then((account)=>{
            productLogicInstance.methods.deleteProduct(key)
            .send({from: account})
            .then(resolve)
            .catch(()=>{
              reject("Error deleting the product")
            })
          })
          .catch(reject)
        })
        .catch(reject)
      })
    },

    /**
     * @description Returns the full IPFS hash starting from the remaining hash
     * @param {} remainingHash  remaining part of the splitted ipfs hash
     *
     */
    getProductHash: function(remainingHash){
      return new Promise((resolve, reject)=>{
        web3util.getContractInstance(ProductLogic)
        .then((productLogicInstance)=>{
          productLogicInstance.methods.getProductCid(remainingHash)
          .call()
          .then((ris)=>{
            var hashIPFS = ris[0];
            var hashFun = ris[1];
            var hashSize = ris[2];
            resolve(web3util.recomposeIPFSHash(hashIPFS, hashSize, hashFun));
          })
          .catch(()=>{
            reject("Error getting the product CID")
          })
        })
        .catch(reject)
      })
    },
    /**
     * @returns Return the amount of products inserted in the platform
     * @param {*} sender If setted to "true", it return only the sender products
     */
    getTotalProducts : function(sender=false){
      return new Promise((resolve, reject)=>{
        web3util.getContractInstance(ProductLogic)
        .then((productLogicInstance) =>{
          web3util.getCurrentAccount()
          .then((account)=>{
            // preparing the query
            var query;
            if (sender === true){
              query = {
                //filtering by the seller (only sender products)
                filter: {_seller: account},
                fromBlock: 0,
                toBlock: 'latest'
              }
            }
            else {
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
              .catch(()=>{
                reject("Error retrieving the events: ProductDeleted")
              })
            })
            .catch(()=>{
              reject("Error retrieving the events: ProductInserted")
            })
          })
          .catch(reject)
        })
        .catch(reject)
      })
    },
    /**
     * @returns The function returns an array of array with the following format:
     *  [product key (ID), IPFSHash, seller]
     *
     * @param {*} amount The amount of products you want to get
     * @param {*} index The statring point for getting the products, the returned products will
     * start from the amount*index-th one
     * @param {*} sender If setted to "true", it return only the sender products
     */
    getProducts: function(amount, index, sender=false) {
      return new Promise((resolve, reject)=>{
        web3util.getContractInstance(ProductLogic)
        .then((productLogicInstance) =>{
          web3util.getCurrentAccount()
          .then((account)=>{
            // preparing the query
            var query;
            if (sender === true){
              query = {
                //filtering by the seller (only sender products)
                filter: {_seller: account},
                fromBlock: 0,
                toBlock: 'latest'
              }
            }
            else {
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
                    //now products contains only the last version of the seller's products
                    //finally, get the products CID from web3 and converting it in base58
                    var promises = [];
                    for(let i = 0; i < products.length; i++){
                      promises.push(
                        new Promise((resolve)=>{
                          this.getProductHash(products[i])
                          .then((ipfsHash)=>{
                            productLogicInstance.methods.getProductSeller(products[i])
                            .call()
                            .then((seller) => {
                              resolve([products[i], ipfsHash, seller])
                            })
                            .catch(()=>{
                              reject("Not able to find the product's seller")
                            })
                         })
                         .catch(reject)
                      }))
                    }
                    //resolves all the products values
                    Promise.all(promises)
                    .then((ris)=>{
                      resolve(ris)
                    })
                    .catch(reject)
                  }
                })
                .catch(()=>{
                  reject("Error trying to get the ProductModified events")
                })
              })
              .catch(()=>{
                reject("Error trying to get the ProductDeleted events")
              })
            })
            .catch(()=>{
              reject("Error trying to get the ProductInserted events")
            })
          })
          .catch(reject)
        })
        .catch(reject)
      })
    },
    /**
     * @returns An array containing the IPFS Hashes of the Invoices related to the selected period
     * along with the invoiec type (selling/purchase)
     * @param {*} VATPeriod VAT period in the following format YYYY-Q (e.g., 2019-2)
     */
    getInvoices: function(VATPeriod = undefined) {
      //must get all the purchase order and the selling order
      return new Promise((resolve, reject)=>{
        web3util.getContractInstance(VatLogic)
        .then((vatLogicInstance)=>{
          web3util.getContractInstance(OrderLogic)
          .then((orderLogicInstance)=>{
            web3util.getCurrentAccount()
            .then(async (account)=>{
              var queryPurchase;
              var querySelling;

              if(VATPeriod === undefined){
                queryPurchase = {
                  filter: {
                    _buyer: account,
                  },
                  fromBlock: 0,
                  toBlock: 'latest'
                }

                querySelling = {
                  filter: {
                    _seller: account,
                  },
                  fromBlock: 0,
                  toBlock: 'latest'
                }
              }
              else{
                await vatLogicInstance.methods.createVatKey(account, VATPeriod)
                .call({from: account})
                .then((key)=>{
                  //filtering by the current account and the key to access the right VAT period
                  queryPurchase = {
                    filter: {
                      _buyer: account,
                      _key: key
                    },
                    fromBlock: 0,
                    toBlock: 'latest'
                  }

                  querySelling = {
                    filter: {
                      _seller: account,
                      _key: key
                    },
                    fromBlock: 0,
                    toBlock: 'latest'
                  }
                })
                .catch((err)=>{
                  reject("Error retreiving the VAT key: "+err)
                })
              }

              var invoicesKey = []

              orderLogicInstance.getPastEvents("PurchaseOrderInserted", queryPurchase)
              .then((events)=>{
                console.log(events)
                for(let i = 0; i < events.length; i++){
                  invoicesKey.push(events[i].returnValues._keyHash);
                }

                orderLogicInstance.getPastEvents("SellOrderInserted", querySelling)
                .then((events)=>{
                  console.log(events)
                  for(let i = 0; i < events.length; i++){
                    invoicesKey.push(events[i].returnValues._keyHash);
                  }
                  //invoicesKey contains all the 32byte key, getting the IPFS hashes
                  var invoicesIPFS = []
                  console.log(invoicesKey)
                  for (let j = 0; j < invoicesKey.length; j++){
                    invoicesIPFS.push(
                      new Promise((resolve)=>{
                        web3util.getContractInstance(OrderLogic).then((orderLogicInstance)=>{
                          web3util.getCurrentAccount().then((account)=>{
                            console.log(invoicesKey[j])
                            orderLogicInstance.methods.getOrderCid(invoicesKey[j])
                            .call({from: account})
                            .then((hashParts)=>{
                              resolve(web3util.recomposeIPFSHash(hashParts[0], hashParts[2], hashParts[1]))
                            })
                          })
                        })
                      })
                    )
                  }
                  Promise.all(invoicesIPFS)
                  .then(resolve)
                })
                .catch(()=>{
                  reject("Error trying to get the SellOrderInserted events")
                })
              })
              .catch(()=>{
                reject("Error trying to get the PurchaseOrderInserted events")
              })
            })
            .catch(reject)
          })
          .catch(reject)
        })
        .catch(reject)
      })
    },
    /**
     *@returns The function return the VAT info of a VAT period, of the logged-in business. The
     is returned as follow: [businessAddress, state, amount]
     *
     * @param {*} period The var period given as YYYY-Q (e.g., 2019-2)
     */
    getVATPeriodInfo: function(period){
      return new Promise((resolve, reject)=>{
        web3util.getCurrentAccount().then((account)=>{
          web3util.getContractInstance(VatLogic).then((vatLogicInstance)=>{
            vatLogicInstance.methods.createVatKey(account, period)
            .call()
            .then((key)=>{
              vatLogicInstance.methods.getVatData(key)
              .call()
              .then((ris)=>{
                //arrives in the following order [businessAddress, state, amount]
                resolve([ris[0], ris[1], ris[2]/web3util.TOKENMULTIPLIER])
              })
              .catch(()=>{
                reject("Unable to get the information of the given Period")
              })
            })
            .catch(()=>{
              reject("Unable to get the VAT key for the given period")
            })
          })
          .catch(reject)
        })
        .catch(reject)
      })
    },
    /**
     * @description returns a promise that resolves if the payment succeded, reject with an error
     * otherwise
     *
     * @param {*} period The period the business wants to pay the VAT tax
     * @param {*} amount The amount of the tax, used to make the approve call,
     * the amount is then checked again in solidity
     */
    payVATPeriod: function(period, amount) {
      return new Promise((resolve, reject)=>{
        web3util.getCurrentAccount()
        .then((account)=>{
          web3util.tokenTransferApprove(parseInt(round(amount*web3util.TOKENMULTIPLIER)), VatLogic)
          .then(()=>{
            web3util.getContractInstance(VatLogic)
            .then((vatLogicInstance)=>{
              vatLogicInstance.methods.createVatKey(account, period)
              .call()
              .then((key)=>{
                vatLogicInstance.methods.payVat(key)
                .send({from: account})
                .then(resolve)
              })
              .catch(()=>{
                reject("Unable to pay the VAT for the given VAT key")
              })
            })
            .catch(()=>{
              reject("Unable to get the VAT key for the given period")
            })
          })
          .catch(reject)
        })
        .catch(reject)
      })
    },
    /**
     * @description returns a promise that resolves if the payment succeded, reject with an error
     * otherwise
     * @param {*} period The VAT period the business wants to defer
     */
    putOnHoldVATPeriod: function(period) {
      return new Promise((resolve, reject)=>{
        web3util.getCurrentAccount().then((account)=>{
          web3util.getContractInstance(VatLogic).then((vatLogicInstance)=>{
            vatLogicInstance.methods.createVatKey(account, period)
            .call()
            .then((key)=>{
              vatLogicInstance.methods.putOnHold(key)
              .send({from: account})
              .then(resolve)
              .catch(()=>{
                reject("Unable to put on hold the given period")
              })
            })
            .catch(()=>{
              reject("Unable to get the VAT key for the given period")
            })
          })
          .catch(reject)
        })
        .catch(reject)
      })
    }
  }
}());

export default web3business;
