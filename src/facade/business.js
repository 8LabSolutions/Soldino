import web3business from "../web3functions/business"
import ipfsModule from "../ipfsCalls/index"
import web3util from "../web3functions/web_util";
import { round } from "../auxiliaryFunctions";

const business = (function(){

  function getProducts(ris) {
    var promises = [];
    for (let i = 0; i< ris.length; i++){
      promises.push(new Promise((resolve)=>{
        getIPFSProduct(ris[i][1])
        .then((middle)=>{
          middle.keyProd = ris[i][0]
          middle.seller = ris[i][2]
          resolve(middle);
        })
      }));
    }
    return Promise.all(promises)
  }
  /**
   * @returns A promise that resolves with the JSON of the products passed
   * @param {*} hashIPFS The IPFS CID of the products
   */
  function getIPFSProduct(hashIPFS) {
    //only from ipfs
    return new Promise((resolve, reject)=>{
      //get the user Info
      ipfsModule.getJSONfromHash(hashIPFS)
      .then(resolve)
      .catch(reject)
    })
  }
  /**
   * @returns Return a JSON with the passed fields
   * @param {*} title
   * @param {*} description
   * @param {*} netPrice
   * @param {*} vatPercentage
   * @param {*} image
   * @param {*} sellerName
   * @param {*} sellerVATNumber
   */
  function getProductJSONfromFields(title, description, netPrice, vatPercentage, image, sellerName, sellerVATNumber){
    var newProductJSON = {
      title: title,
      description: description,
      netPrice: netPrice,
      vatPercentage: vatPercentage,
      totalPrice: +netPrice + +netPrice*(+vatPercentage/100), //lordo
      sellerName: sellerName,
      sellerVATNumber: sellerVATNumber,
      image: image,
    }
    return newProductJSON;
  }

  return{
    /**
     * @returns The function returns a promise that resolves if the product is correctly inserted,
     * otherwise rejects with an error
     *
     * @param {*} title
     * @param {*} description
     * @param {*} netPrice
     * @param {*} vatPercentage
     * @param {*} image
     * @param {*} sellerName
     * @param {*} sellerVATNumber
     */
    addProduct: function(title, description, netPrice, vatPercentage, image, sellerName, sellerVATNumber){
      //istantiate the necessary costracts and returns the results
      console.log("INSERIMENTO PRODOTTO IPFS:")
      console.log((round(netPrice)))
      console.log(round(vatPercentage))
      var newProductJSON = getProductJSONfromFields(
        title, description, round(netPrice), round(vatPercentage), image, sellerName, sellerVATNumber);
      return new Promise((resolve, reject)=>{
        ipfsModule.insertJSONintoIPFS(newProductJSON)
        .then((hash)=>{
          web3business.addProduct(hash, vatPercentage, netPrice)
          .then(resolve)
          .catch(reject)
        })
        .catch(reject)
      })
    },
    /**
     * The function returns a promise that resolves if the product is correctly modified,
     * otherwise rejects with an error
     *
     * @param {*} keyProd
     * @param {*} title
     * @param {*} description
     * @param {*} netPrice
     * @param {*} vatPercentage
     * @param {*} image
     * @param {*} sellerName
     * @param {*} sellerVATNumber
     */
    modifyProduct: function(keyProd, title, description, netPrice, vatPercentage, image, sellerName, sellerVATNumber){
      var newProductJSON = getProductJSONfromFields(
        title, description, parseInt(round(netPrice)), parseInt(round(vatPercentage)), image, sellerName, sellerVATNumber);
      console.log(image)
      return new Promise((resolve, reject)=>{
        ipfsModule.insertJSONintoIPFS(newProductJSON)
        .then((hash)=>{
          web3business.modifyProduct(keyProd, hash, vatPercentage, netPrice)
          .then(resolve)
          .catch(reject)
        })
        .catch(reject)
      })
    },
    /**
     * @description Delete the product corresponding to the key passed
     * @param {*} key The key of the product you want to delete
     */
    deleteProduct: function(keyProd){
      return new Promise((resolve, reject)=>{
        web3business.deleteProduct(keyProd)
        .then(resolve)
        .catch(reject)
      })
    },
    /**
     * @returns The functions return a promise that resolves the number of products
     * in the store, otherwise rejects an error
     */
    getTotalStoreProduct: function(){
      return new Promise((resolve, reject)=>{
        web3business.getTotalProducts()
        .then(resolve)
        .catch(reject)
      })
    },
    /**
     * @returns The functions return a promise that resolves the number ofproducts
     * currently sold by the calling business, otherwise rejects an error
     */
    getTotalMyProduct: function(){
      return new Promise((resolve, reject)=>{
        web3business.getTotalProducts(true)
        .then(resolve)
        .catch(reject)
      })
    },
    /**
     * @returns The function returns a promise that resolves an array containing
     * the requested business products JSONs.
     * @param {*} amount The amount of products you want to get
     * @param {*} index The statring point for getting the products, the returned products will
     * start from the amount*index-th one
     */
    getSenderProduct: function(amount, index) {
      return new Promise((resolve, reject)=>{
        //scorrere gli eventi per trovare quelli con come seller l'account sender
        web3business.getProducts(amount, index, true)
        .then((ris)=>{
          //ris contains the array of ipfs hash
          getProducts(ris)
          .then(resolve)
          .catch(reject)
        })
        .catch(reject)
      })
    },
     /**
     * @returns The function returns a promise that resolves an array containing
     * the requested store products JSONs.
     * @param {*} amount The amount of products you want to get
     * @param {*} index The statring point for getting the products, the returned products will
     * start from the amount*index-th one
     */
    getStoreProduct: function(amount, index) {
      return new Promise((resolve, reject)=>{
        web3business.getProducts(amount, index)
        .then((ris)=>{
          //ris contains the array of ipfs hash
          //ris = shuffle(ris)
          getProducts(ris)
          .then(resolve)
          .catch(reject)
        })
        .catch(reject)
      })
    },
    /**
     * @returns An array containing the JSON of the Invoices related to the selected period
     * along with the invoiec type (selling/purchase)
     * @param {*} VATPeriod VAT period in the following format YYYY-Q (e.g., 2019-2)
     */
    getInvoices: function(VATPeriod) {
      return new Promise((resolve, reject)=>{
        web3business.getInvoices(VATPeriod)
        .then((invoicesIPFSHash)=>{
          var invoicesJSON = []
          invoicesIPFSHash.forEach(invoceIPFSHash => {
            invoicesJSON.push(
              new Promise((resolve)=>{
                ipfsModule.getJSONfromHash(invoceIPFSHash)
                .then(resolve)
                .catch(reject)
              })
            )
          });
          Promise.all(invoicesJSON)
          .then(resolve)
          .catch(reject)
        })
        .catch(reject)
      })
    },
    /**
     * @returns the vat period of the business user, like a JSON with the following format:
     *  var vatJSON = {
          id: period,
          amount: amount,
          deferred: deferred,
          defereable: defereable,
          payable: payable,
          resolved: resolved,
          outOfLimit: outOfLimit
        }
     */
    getPeriods: function() {
      return new Promise((resolve, reject)=>{
        web3business.getInvoices()
        .then((invoicesIPFSHash)=>{
          var invoicesJSON = []
          invoicesIPFSHash.forEach(invoceIPFSHash => {
            invoicesJSON.push(
              new Promise((resolve)=>{
                ipfsModule.getJSONfromHash(invoceIPFSHash)
                .then(resolve)
                .catch(reject)
              })
            )
          });
          Promise.all(invoicesJSON)
          .then((ris)=>{
            //get the date, then the periods
            var dates = []
            ris.forEach(json => {
              if(!dates.includes(json.date))
                dates.push(json.date);
            });

            var periods = []
            dates.forEach(date=>{
              var [year, month,] = date.split("/");
              let newPeriod = web3util.getVATPeriod(month, year);
              if (!periods.includes(newPeriod))
                periods.push(newPeriod);
            })
            var promises = []
            periods.forEach(period=>{
              promises.push(new Promise((resolve)=>{
                web3business.getVATPeriodInfo(period)
                .then(([, state, amount])=>{
                  //get the state of the period
                  console.log(["stato: ", state])
                  var deferred = false;
                  var defereable = false;
                  var payable = false;
                  var resolved = false;
                  var outOfLimit = false;
                  //enum state {DUE, OVERDUE, PAID, TO_BE_REFUNDED, REFUNDED}
                  let currentVATPeriod = web3util.getVATPeriod();
                  let oldVATPeriod = period;

                  let [currYear, currMonth] = currentVATPeriod.split("-");
                  let [oldYear, oldMonth] = oldVATPeriod.split("-");

                  [currYear, currMonth] = currentVATPeriod.split("-");
                  [oldYear, oldMonth] = oldVATPeriod.split("-");

                  switch (parseInt(state)) {

                    case 0:
                    //the business have to pay to the government
                    //it could pay of defer
                      //if it is the current period, all  the flags are false
                      if(((currYear-oldYear)*4+(currMonth-oldMonth)) !== 0){
                        defereable = true;
                        payable = true;
                        //check if the payment is out ou limit
                        currentVATPeriod = web3util.getVATPeriod();
                        oldVATPeriod = period;

                        if(((currYear-oldYear)*4+(currMonth-oldMonth))>1){
                          outOfLimit = true;
                          defereable = false;
                          payable = false;
                        }
                      }
                      break;
                    case 1:
                    //the payment was deferred
                      deferred = true;
                      //check if the payment is out ou limit
                      payable = true;
                      if(((currYear-oldYear)*4+(currMonth-oldMonth))>2){
                        outOfLimit = true;
                        defereable = false;
                        payable = false;
                      }
                      break;
                    case 2:
                    //the business paid the vat to government
                      resolved = true;
                      break;
                    case 3:
                    //the government must pay the vat
                      break;
                    case 4:
                    //the government did the refund
                      resolved = true;
                      break;
                    default:
                      console.log('ERRORE PERIODO')

                  }
                  var vatJSON = {
                    id: period,
                    amount: amount,
                    deferred: deferred,
                    defereable: defereable,
                    payable: payable,
                    resolved: resolved,
                    outOfLimit: outOfLimit
                  }
                  resolve(vatJSON)
                })
                .catch(reject)
              }))
            })
            Promise.all(promises)
            .then(resolve)
            .catch(reject)
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
        web3business.payVATPeriod(period, amount)
        .then(resolve)
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
        web3business.putOnHoldVATPeriod(period)
        .then(resolve)
        .catch(reject)
      })
    }

  }
}());


export default business;
