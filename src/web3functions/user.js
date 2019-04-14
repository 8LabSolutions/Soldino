import web3util from "./web_util";
import Purchase from "../contracts_build/Purchase"
import TokenCubit from "../contracts_build/TokenCubit"

const web3user = (function(){

  var web3;

  function initialize(contract){
    return new Promise((resolve, reject) =>{
      web3util.getWeb3().then((_web3)=>{
        web3 = _web3;
        //get the instance of the contratc and resolves it
        web3util.getContractInstance(web3, contract).then(resolve)
      }).catch((err)=>{
        reject(err)
      })
    })
  }

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
        initialize(TokenCubit).then((tokenInstance)=>{
          console.log('TOKENNN')
          console.log(tokenInstance)
          initialize(Purchase).then((purchaseInstance)=>{
            web3.eth.getAccounts().then((account)=>{
              tokenInstance.methods.approve(purchaseInstance.options.address, parseInt((amount+1)*100))
              .send({from: account[0]})
              .then(resolve)
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
        initialize(Purchase).then((purchaseInstance)=>{
          web3.eth.getAccounts().then((account)=>{
            purchaseInstance.methods.saveAndPayOrder(
              products,
              productQtn,
              remainingHash,
              hashFun,
              hashSize,
              getVATPeriod())
            .send({from: account[0], gas: 2000000})
            .then(resolve)
          })
        })
      })
    }
  }
}());

export default web3user;
