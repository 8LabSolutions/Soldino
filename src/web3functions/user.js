import web3util from "./web_util";
import Purchase from "../contracts_build/Purchase"
import TokenCubit from "../contracts_build/TokenCubit"

const web3user = (function(){

  //initializing web3
  web3util.init()

  //return the actual VAT period
  function getVATPeriod(){
    var today = new Date();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    var period = parseInt(mm/4) +1
    return String(yyyy).concat("-").concat(String(period))
  }

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

      return new Promise((resolve)=>{
        web3util.getContractInstance(Purchase).then((purchaseInstance)=>{
          console.log("Chiamata acquisto a: "+purchaseInstance.options.address)
          web3util.getCurrentAccount().then((account)=>{
            purchaseInstance.methods.saveAndPayOrder(
              products,
              productQtn,
              remainingHash,
              hashFun,
              hashSize,
              getVATPeriod())
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
    }
  }
}());

export default web3user;
