import web3util from "./web_util";
import Purchase from "../contracts_build/Purchase"
import TokenCubit from "../contracts_build/TokenCubit"
import OrderLogic from "../contracts_build/OrderLogic"
import { round } from "../auxiliaryFunctions";

const web3user = (function(){

  //initializing web3
  web3util.init()

  /**
   * @returns The function returns a promise that resolve with the balance of the current user,
   * otherwise reject with an error
   */
  function getBalance(){
    return new Promise((resolve, reject)=>{
      web3util.getContractInstance(TokenCubit)
      .then((tokenInstance)=>{
        web3util.getCurrentAccount()
        .then((account)=>{
          tokenInstance.methods.balanceOf(account)
          .call()
          .then((balance)=>{
            if(balance!==0)
              balance/=web3util.TOKENMULTIPLIER;
            resolve(round(balance))
          })
        })
        .catch(reject)
      })
      .catch(reject)
    })
  }

  return{
    /**
     * @description Buy the products passed. The array must be ordered such that the i-th cell of each
     * array refers to the same product. This function asks for two confirmation to the client, since
     * it must firstly approve the Purchase contract to withdraw the total amount from the user address,
     * and than it must confirm the final transaction.
     *
     * @param {*} amount The total amount that must be payed. The amount will be recalculated.
     * @param {*} products Array containing the products JSON
     * @param {*} remainingHash The respective product IPFS CID (ID)
     * @param {*} hashSize The respective product IPFS CID (size)
     * @param {*} hashFun The respective product IPFS CID (fun)
     * @param {*} productQtn The respective product quantity
     */
    purchase: function(amount, products, remainingHash, hashSize, hashFun, productQtn){

      for (let i = 0; i< products.length; i++){
        products[i] = products[i].keyProd
      }
      return new Promise((resolve, reject)=>{
        web3util.getContractInstance(Purchase)
        .then((purchaseInstance)=>{
          web3util.getCurrentAccount()
          .then((account)=>{
            getBalance()
            .then((balance)=>{
              if(balance<amount)
                reject("You have not enough Cubit to complete the purchase :(")
              web3util.tokenTransferApprove(amount, Purchase)
              .then(()=>{
                purchaseInstance.methods.saveAndPayOrder(
                  products,
                  productQtn,
                  remainingHash,
                  hashFun,
                  hashSize,
                  web3util.getVATPeriod())
                .send({from: account, gas: 2000000})
                .then(resolve)
                .catch(()=>{
                  reject("There were some problems with the payment, please contanct the system administrator. ")
                })
              })
              .catch(reject)
            })
            .catch(reject)
          })
          .catch(reject)
        })
        .catch(reject)
      })
    },
   /**
     * @returns The function returns a promise that resolve with the balance of the current user,
     * otherwise reject with an error
     */
    getBalance: getBalance,
    /**
     * @returns The function returns all the IPFS hashes of the current account,
     * from which it is possible to retrieve all the information
     */
    getPurchase: function(){
      return new Promise((resolve, reject)=>{
        web3util.getContractInstance(OrderLogic)
        .then((orderLogicInstance) => {
          web3util.getCurrentAccount()
          .then((account) => {
            orderLogicInstance.getPastEvents("PurchaseOrderInserted", {filter: {_buyer: account},
            fromBlock: 0,
            toBlock: 'latest'})
            .then((events) => {
              let orderHashes = []
              for (let i = 0; i< events.length; i++){
                orderHashes.push(events[i].returnValues._keyHash)
              }
              //get the full IPFS address
              let orderIPFS = []
              for (let i = 0; i< orderHashes.length; i++){
                orderIPFS.push(
                  new Promise((resolve)=>{
                    web3util.getContractInstance(OrderLogic)
                    .then((orderLogicInstance)=>{
                      web3util.getCurrentAccount()
                      .then((account)=>{
                        orderLogicInstance.methods.getOrderCid(orderHashes[i])
                        .call({from: account})
                        .then((hashParts)=>{
                          resolve(web3util.recomposeIPFSHash(hashParts[0], hashParts[2], hashParts[1]))
                        })
                        .catch(()=>{
                          reject("Not able to find the order CID. Please contanct the system administrator")
                        })
                      })
                      .catch(reject)
                    })
                    .catch(reject)
                  })
                )
              }
              Promise.all(orderIPFS)
              .then((ris)=>{
                resolve(ris)
              })
              .catch(reject)
            })
            .catch(()=>{
              reject("Error retriving the events: PurchaseOrderInserted")
            })
          })
          .catch(reject)
        })
        .catch(reject)
      })
    },
    /**
     * @returns The function returns the number of purchases done by the current user
     */
    getPurchaseNumber: function(){
      return new Promise((resolve, reject)=>{
        web3util.getContractInstance(OrderLogic)
        .then((orderLogicInstance) => {
          orderLogicInstance.getPastEvents("PurchaseOrderInserted", {
          fromBlock: 0,
          toBlock: 'latest'})
          .then((events) => {
            resolve(events.length)
          })
          .catch(()=>{
            reject("Error retriving the events: PurchaseOrderInserted")
          })
        })
        .catch(reject)
      })
    }
  }
}());

export default web3user;
