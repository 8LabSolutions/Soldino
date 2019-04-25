import web3business from "../web3functions/business"
import ipfsModule from "../ipfsCalls/index"

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
    addProduct: function(title, description, netPrice, vatPercentage, image, sellerName/*="azienda1"*/, sellerVATNumber/*="provvisorio"*/){
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
          web3business.modifyProduct(keyProd, hash).then(resolve)
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
    }
  }
}());


export default business;
