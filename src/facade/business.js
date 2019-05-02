import web3business from "../web3functions/business"
import ipfsModule from "../ipfsCalls/index"
import web3util from "../web3functions/web_util";

const business = (function(){

  /**
   * @description Shuffles array in place
   * @param {Array} a items An array containing the items.
   */
  /*
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  */

  /**
   * @description The function return an array of promises that will resolve into products' JSON
   *
   * @param {*} ris the array o arrays [product-key, product IPFS hash]
   * @param {*} amount the limit of products that will be returned
   */
  function getProducts(ris) {
    var promises = [];
    for (let i = 0; i< ris.length; i++){
      promises.push(new Promise((resolve)=>{
        getIPFSProduct(ris[i][1]).then((middle)=>{
          middle.keyProd = ris[i][0]
          middle.seller = ris[i][2]
          resolve(middle);
        })
      }));
    }
    return Promise.all(promises)
  }

  function getIPFSProduct(hashIPFS) {
    //only from ipfs
    return new Promise((resolve)=>{
      //get the user Info
      ipfsModule.getJSONfromHash(hashIPFS).then(resolve)
    })
  }

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
     * @description return a promise about the registration of the user
     * @param {*} userType
     * @param {*} email
     * @param {*} streetName
     * @param {*} streetNumber
     * @param {*} district
     * @param {*} postCode
     * @param {*} name
     * @param {*} details
    */
    addProduct: function(title, description, netPrice, vatPercentage, image, sellerName, sellerVATNumber){
      //istantiate the necessary costracts and returns the results
      console.log("ADDPRODUCT interno")
      console.log(image)
      var newProductJSON = getProductJSONfromFields(
        title, description, netPrice, vatPercentage, image, sellerName, sellerVATNumber);
      return new Promise((resolve)=>{
        ipfsModule.insertJSONintoIPFS(newProductJSON).then((hash)=>{
          web3business.addProduct(hash, vatPercentage, netPrice).then(resolve)
        })
      })
    },

    modifyProduct: function(keyProd, title, description, netPrice, vatPercentage, image, sellerName, sellerVATNumber){
      var newProductJSON = getProductJSONfromFields(
        title, description, netPrice, vatPercentage, image, sellerName, sellerVATNumber);
      return new Promise((resolve)=>{
        ipfsModule.insertJSONintoIPFS(newProductJSON).then((hash)=>{
          console.log(keyProd)
          console.log(hash)
          console.log(vatPercentage)
          console.log(netPrice)
          console.log("entro in modify")
          web3business.modifyProduct(keyProd, hash, vatPercentage, netPrice).then(resolve)
        })
      })
    },

    deleteProduct: function(keyProd){
      return new Promise((resolve)=>{
        web3business.deleteProduct(keyProd).then(resolve)
      })
    },

    getTotalStoreProduct: function(){
      return new Promise((resolve)=>{
        web3business.getTotalProducts().then(resolve)
      })
    },

    getTotalMyProduct: function(){
      return new Promise((resolve)=>{
        web3business.getTotalProducts(true).then(resolve)
      })
    },

    getSenderProduct: function(amount, index) {
      return new Promise((resolve)=>{
        //scorrere gli eventi per trovare quelli con come seller l'account sender
        web3business.getProducts(amount, index, true).then((ris)=>{
          //ris contains the array of ipfs hash
          getProducts(ris).then(resolve)
        })
      })
    },

    getStoreProduct: function(amount, index) {
      return new Promise((resolve)=>{
        web3business.getProducts(amount, index).then((ris)=>{
          //ris contains the array of ipfs hash
          //ris = shuffle(ris)
          getProducts(ris).then(resolve)
        })
      })
    },

    getInvoices: function(VATPeriod) {
      return new Promise((resolve)=>{
        web3business.getInvoices(VATPeriod).then((invoicesIPFSHash)=>{
          var invoicesJSON = []
          invoicesIPFSHash.forEach(invoceIPFSHash => {
            invoicesJSON.push(
              new Promise((resolve)=>{
                ipfsModule.getJSONfromHash(invoceIPFSHash).then(resolve)
              })
            )
          });
          Promise.all(invoicesJSON).then(resolve)
        })
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
     *
     */
    getPeriods: function() {
      return new Promise((resolve)=>{
        web3business.getInvoices().then((invoicesIPFSHash)=>{
          var invoicesJSON = []
          invoicesIPFSHash.forEach(invoceIPFSHash => {
            invoicesJSON.push(
              new Promise((resolve)=>{
                ipfsModule.getJSONfromHash(invoceIPFSHash).then(resolve)
              })
            )
          });
          Promise.all(invoicesJSON).then((ris)=>{
            //get the date, then the periods
            console.log(ris)

            var dates = []
            ris.forEach(json => {
              if(!dates.includes(json.date))
                dates.push(json.date);
            });

            var periods = []
            dates.forEach(date=>{
              var [year, month,] = date.split("/");
              periods.push(web3util.getVATPeriod(month, year));
            })
            console.log("periods: "+periods)
            var promises = []
            periods.forEach(period=>{
              promises.push(new Promise((resolve)=>{
                web3business.getVATPeriodInfo(period).then(([, state, amount])=>{
                  //get the state of the period
                  console.log(["stato: ", state])
                  var deferred = false;
                  var defereable = false;
                  var payable = false; //false
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
                    amount: amount/web3util.TOKENMULTIPLIER,
                    deferred: deferred,
                    defereable: defereable,
                    payable: payable,
                    resolved: resolved,
                    outOfLimit: outOfLimit
                  }

                  resolve(vatJSON)
                })
              }))
            })
            Promise.all(promises).then(resolve)
          })
        })
      })
    },

    payVATPeriod: function(period) {
      return new Promise((resolve)=>{
        web3business.payVATPeriod(period)
        .then(resolve)
      })

    },

    putOnHoldVATPeriod: function(period) {
      return new Promise((resolve)=>{
        web3business.putOnHoldVATPeriod(period)
        .then(resolve)
      })
    }

  }
}());


export default business;
