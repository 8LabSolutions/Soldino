import web3business from "../web3functions/business"
import ipfsModule from "../ipfsCalls/index"

const business = (function(){
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
    addProduct: function(title, description, netPrice, vatPercentage, image){
      //istantiate the necessary costracts and returns the results
      var newProductJSON = {
        title: title,
        description: description,
        name: name,
        netPrice: netPrice,
        vatPercentage: vatPercentage,
        totalPrice: +netPrice + +netPrice*(+vatPercentage/100),
        image: image
      }
      return new Promise((resolve)=>{
        ipfsModule.insertJSONintoIPFS(newProductJSON).then(async (hash)=>{
          //splitting the hash in three parts to save them into the blockchain
          web3business.addProduct(hash, vatPercentage, netPrice).then(resolve)
        })
      })
    },

    getProduct: function(remainingHash) {
      //only from ipfs
      return new Promise((resolve)=>{
        web3business.getProductHash(remainingHash).then((hashIPFS)=>{
          //get the user Info
          ipfsModule.getJSONfromHash(hashIPFS).then(resolve)
        })
      })
    },

    getSenderProduct: function() {
      return new Promise((resolve)=>{
        //scorrere gli eventi per trovare quelli con come seller l'account sender

        //eliminare gli eliminati

        //eliminare quelli che hanno un'ultima modifica
        resolve()
      })
    }

  }
}());


export default business;
