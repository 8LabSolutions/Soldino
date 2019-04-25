import web3util from "../web3functions/web_util"
import ipfsModule from "../ipfsCalls/index"
import web3user from "../web3functions/user"

import Purchase from "../contracts_build/Purchase"
import OrderLogic from "../contracts_build/OrderLogic"
//TODO resolve in buy function
const user = (function(){

  function groupProductsBySeller(products){
    return products.sort((a,b) => (a.seller > b.seller) ? 1 : ((b.seller > a.seller) ? -1 : 0));
  }

  function splitInSellerArray(products){
    var productAux = [];
    var prevSeller = products[0].seller;
    var result = []
    for(let i = 0; i< products.length; i++){
      if(products[i].seller !== prevSeller){
        prevSeller = products[i].seller;
        result.push(productAux);
        productAux = [];
      }
      productAux.push(products[i]);
    }
    result.push(productAux);
    return result;
  }

  function getTotalVAT(products){
    let sum = 0;
    for(let i = 0; i < products.length; i++){
      sum+= parseInt((products[i].VAT));
    }
    return sum;
  }

  function getTotalNet(products){
    let sum = 0;
    for(let i = 0; i < products.length; i++){
      sum+= (products[i].price*100)/(+100 + +parseInt((products[i].VAT)));
    }
    return sum;
  }

  function getTotal(products){
    var sum = 0;
    for(let i = 0; i < products.length; i++){
      sum+= products[i].price;
    }
    return sum;
  }


  return {
    buy: function(cartInfo){
      return new Promise((resolve)=>{
         //get all the products

        var products = cartInfo.products;
        console.log(products)
        //cartInfo contains all the information about the order

        //sort the products by seller
        products = groupProductsBySeller(products)
        console.log("PRODOTTI")
        console.log(products)
        var orders = splitInSellerArray(products)
        console.log("ORDINI")
        console.log(orders)

        var promises = []
        for(let i = 0; i < orders.length; i++){
          var order = {
            products: orders[i],
            date: cartInfo.date,
            number: new Date().getUTCMilliseconds(),
            VAT: getTotalVAT(orders[i]),
            net: getTotalNet(orders[i]),
            total: getTotal(orders[i]),
            address: cartInfo.date,
            buyerName: cartInfo.buyerName,
            buyerDetails: cartInfo.buyerDetails,
            sellerName: orders[i][0].sellerName,
            sellerVATNumber: orders[i][0].sellerVATNumber
          }
          promises.push(new Promise((resolve)=>{
            ipfsModule.insertJSONintoIPFS(order).then(resolve)
          }))
        }

        Promise.all(promises).then((results)=>{
          //results: array of IPFS (orders)
          var remainingHash = []
          var hashSize = []
          var hashFun = []
          var productQtn = []
          for(let i = 0; i < results.length; i++){
            for(let j = 0 ; j < orders[i].length; j++){
              let [rH, hS, hF] = web3util.splitIPFSHash(results[i]);
              console.log(rH)
              remainingHash.push(rH);
              hashSize.push(hS);
              hashFun.push(hF);
              productQtn.push(orders[i][j].quantity)
            }
          }
          /*let something = []
          for(var i=0; i<products.length; i++){
            something[i] = products[i]
          }*/
          web3user.tokenTransferApprove(cartInfo.VAT+cartInfo.net).then(()=>{
            web3user.purchase(products, remainingHash, hashSize, hashFun, productQtn).then(()=>{
              //return resolve()
              web3util.getContractInstance(Purchase)
              .then((cins) => {
                web3util.getCurrentAccount().then((account) => {
                  cins.getPastEvents("Debug", {filter: {_id: 1},
                  fromBlock: 0,
                  toBlock: 'latest'})
                  .then((ev) => {
                    console.log("Evento")
                    console.log(ev)
                  })
                  .then(() => {
                    web3util.getContractInstance(OrderLogic)
                    .then((ins) => {
                      ins.getPastEvents("PurchaseOrderInserted", {filter: {_buyer: account},
                      fromBlock: 0,
                      toBlock: 'latest'})
                      .then((evO) => {
                        console.log("Evento ordini")
                        console.log(evO)
                      })
                      .then(() => {
                        ins.methods.getOrderTotal("0x9863dcbac114a781fc621442abcf1103013abbede91242f36c63fdeb1f24db21")
                        .call()
                        .then(resolve)
                      })
                    })
                  })
                })

              })
            })
          })
        })
      })
    },

    getBalance: function(){
      return new Promise((resolve)=>{
        web3user.getBalance().then(resolve)
      })
    }
  }
}());

export default user;

