import web3util from "../web3functions/web_util"
import ipfsModule from "../ipfsCalls/index"
import web3user from "../web3functions/user"
import { round } from "../auxiliaryFunctions";

//TODO resolve in buy function
const user = (function(){

  /**
   * @returns The array of products passed sorted by seller
   * @param {*} products The products to be sorted by seller
   */
  function groupProductsBySeller(products){
    return products.sort((a,b) => (a.seller > b.seller) ? 1 : ((b.seller > a.seller) ? -1 : 0));
  }
  /**
   * @returns The function returns an array of array, gruping the products by seller
   * @param {*} products An array of products sorted by seller
   */
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
  /**
   * @returns The total VAT amount of the given products
   * @param {*} products An array of products
   */
  function getTotalVAT(products){
    let netPrice = 0;
    let sumNetPrice = 0;
    let totalVat = 0;
    let totalVatCC = 0;
    for(let i = 0; i < products.length; i++){
      netPrice = (parseFloat((products[i].price*100)/(+100 + +products[i].VAT)))*products[i].quantity;
      totalVatCC += parseFloat((products[i].price*products[i].quantity)-netPrice);
      sumNetPrice += netPrice;
    }
    totalVat = round(parseFloat((totalVatCC*100)/sumNetPrice));
    return totalVat;
  }
  /**
   * @returns The total net amount of the given products
   * @param {*} products An array of products
   */
  function getTotalNet(products){
    let sum = 0;
    for(let i = 0; i < products.length; i++){
      sum+= ((products[i].price*100)/(+100 + +parseFloat((products[i].VAT)))*products[i].quantity);
    }
    return sum;
  }
  /**
   * @returns The total cost (net + VAT) of the given products
   * @param {*} products An array of products
   */
  function getTotal(products){
    var sum = 0;
    for(let i = 0; i < products.length; i++){
      sum+= products[i].price;
    }
    return sum;
  }
  /**
   * @returns The function return a promise that resolves with the number of orders done by
   * the current user, otherwise reject with an error
   */
  function getLastOrderNumber(){
    return new Promise((resolve, reject)=>{
      web3user.getPurchaseNumber()
      .then(resolve)
      .catch(reject)
    })
  }


  return {
    /**
     *
     * @param {*} cartInfo A JSON representing the cart information. The JSON must have the following format:
     *
     * var cart = {
        products: array of products
        date: the current date,
        VAT: the total VAT amount,
        net: the total net amount,
        address: the shipping address,
        buyerName: the name of the buyer,
        buyerDetails: the surname of the citizen or the VAT number of the business
      }
     */
    buy: function(cartInfo){
      return new Promise((resolve, reject)=>{
         //get all the products

        var products = cartInfo.products;
        //cartInfo contains all the information about the order

        //sorting the products by seller
        products = groupProductsBySeller(products)
        var orders = splitInSellerArray(products)
        var promises = []
        getLastOrderNumber()
        .then((number)=>{
          web3util.getCurrentAccount()
          .then((account)=>{
            for(let i = 0; i < orders.length; i++){
              promises.push(new Promise((resolve)=>{
                var order = {
                  products: orders[i],
                  date: cartInfo.date,
                  number: +number + +i + +1,
                  VAT: getTotalVAT(orders[i]),
                  net: getTotalNet(orders[i]),
                  total: getTotal(orders[i]),
                  address: cartInfo.address,
                  buyerName: cartInfo.buyerName,
                  buyerDetails: cartInfo.buyerDetails,
                  buyerAddress: account,
                  sellerName: orders[i][0].sellerName,
                  sellerVATNumber: orders[i][0].sellerVATNumber
                }
                ipfsModule.insertJSONintoIPFS(order)
                .then(resolve)
                .catch(reject)
              }))
            }

            Promise.all(promises)
            .then((results)=>{
              //results: array of IPFS (orders)
              var remainingHash = []
              var hashSize = []
              var hashFun = []
              var productQtn = []
              for(let i = 0; i < results.length; i++){
                for(let j = 0 ; j < orders[i].length; j++){
                  let [rH, hS, hF] = web3util.splitIPFSHash(results[i]);
                  remainingHash.push(rH);
                  hashSize.push(hS);
                  hashFun.push(hF);
                  productQtn.push(orders[i][j].quantity)
                }
              }
              web3user.purchase(cartInfo.VAT+cartInfo.net, products, remainingHash, hashSize, hashFun, productQtn)
              .then(resolve)
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
    getBalance: function(){
      return new Promise((resolve, reject)=>{
        web3user.getBalance()
        .then(resolve)
        .catch(reject)
      })
    },
    /**
     * @returns The function returns all the IPFS hashes of the current account,
     * from which it is possible to retrieve all the information
     */
    getPurchases: function(){
      return new Promise((resolve, reject)=>{
        web3user.getPurchase()
        .then((purchases)=>{
          //getting the orders JSONs from IPFS
          let purchaseJSONs = []
          for(let i = 0; i<purchases.length; i++){
            purchaseJSONs.push(
              new Promise((resolve)=>{
                ipfsModule.getJSONfromHash(purchases[i])
                .then(resolve)
                .catch(reject)
              })
            )
          }
          Promise.all(purchaseJSONs)
          .then(resolve)
          .catch(reject)
        })
        .catch(reject)
      })
    }
  }
}());

export default user;

