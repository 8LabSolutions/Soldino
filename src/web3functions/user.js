import web3util from "./web_util";
import Purchase from "../contracts_build/Purchase"
import TokenCubit from "../contracts_build/TokenCubit"
import OrderLogic from "../contracts_build/OrderLogic"

const web3user = (function(){

  //initializing web3
  web3util.init()

  //return the actual VAT period


  return{
    tokenTransferApprove: function(amount) {
      return new Promise((resolve)=>{
        web3util.getContractInstance(TokenCubit).then((tokenInstance)=>{
          console.log("Cubit "+tokenInstance.options.address)
          web3util.getContractInstance(Purchase).then((purchaseInstance)=>{
            web3util.getCurrentAccount().then((account)=>{
              tokenInstance.methods.approve(purchaseInstance.options.address, parseInt(amount*web3util.TOKENMULTIPLIER))
              .send({from: account})
              .then((txnHash) => {
                return web3util.init()
                .then((web3Instance) => {
                  web3Instance.eth.getTransactionReceipt(txnHash)
                  .then(resolve)
                })
              })
            })
          })
        })
      })
    },

    purchase: function(products, remainingHash, hashSize, hashFun, productQtn){

      for (let i = 0; i< products.length; i++){
        products[i] = products[i].keyProd
      }
      console.log("user.js web3 fun")
      console.log(products)
      console.log(productQtn)
      return new Promise((resolve)=>{
        web3util.getContractInstance(Purchase).then((purchaseInstance)=>{
          console.log("Chiamata acquisto a: "+purchaseInstance.options.address)
          web3util.getCurrentAccount().then((account)=>{
          console.log("user.js web3functions-----------------")
            console.log("prod")
            console.log(products)
            console.log("orders")
            console.log(remainingHash)
            console.log("user.js web3functions----------------- FIN")
            purchaseInstance.methods.saveAndPayOrder(
              products,
              productQtn,
              remainingHash,
              hashFun,
              hashSize,
              web3util.getVATPeriod())
            .send({from: account, gas: 2000000})
            .then(resolve)
          })
        })
      })
    },

    getBalance: function(){
      return new Promise((resolve)=>{
        web3util.getContractInstance(TokenCubit).then((tokenInstance)=>{
          web3util.getCurrentAccount().then((account)=>{
            tokenInstance.methods.balanceOf(account).call().then((balance)=>{
              if(balance!==0)
                balance/=web3util.TOKENMULTIPLIER;
              resolve(balance)
            })
          })
        })
      })
    },

    getPurchase: function(){
      return new Promise((resolve)=>{
        web3util.getContractInstance(OrderLogic)
        .then((orderLogicInstance) => {
          web3util.getCurrentAccount().then((account) => {
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
                    web3util.getContractInstance(OrderLogic).then((orderLogicInstance)=>{
                      web3util.getCurrentAccount().then((account)=>{
                        orderLogicInstance.methods.getOrderCid(orderHashes[i])
                        .call({from: account})
                        .then((hashParts)=>{
                          resolve(web3util.recomposeIPFSHash(hashParts[0], hashParts[2], hashParts[1]))
                        })
                      })
                    })
                  })
                )
              }
              Promise.all(orderIPFS).then((ris)=>{
                resolve(ris)
              })
            })
          })
        })
      })
    },

    getPurchaseNumber: function(){
      return new Promise((resolve)=>{
        web3util.getContractInstance(OrderLogic)
        .then((orderLogicInstance) => {
          orderLogicInstance.getPastEvents("PurchaseOrderInserted", {
          fromBlock: 0,
          toBlock: 'latest'})
          .then((events) => {
            resolve(events.length)
          })
        })
      })
    }
  }
}());

export default web3user;
