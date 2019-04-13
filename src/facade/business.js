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
        netPrice: netPrice,
        vatPercentage: vatPercentage,
        totalPrice: +netPrice + +netPrice*(+vatPercentage/100),
        image: image
      }
      return new Promise((resolve)=>{
        ipfsModule.insertJSONintoIPFS(newProductJSON).then((hash)=>{
          console.log(hash+' del prodotto nuovo')
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

    getSenderProduct: function(amount) {
      return new Promise((resolve)=>{
        //scorrere gli eventi per trovare quelli con come seller l'account sender
        web3business.getSenderProducts().then((ris)=>{
          //ris contains the array of ipfs hash
          if(ris.length>amount)
            ris = ris.slice(0, amount)
          var promises = [];
          for (let i = 0; i< ris.length; i++){
            promises.push(new Promise((resolve)=>{
              ipfsModule.getJSONfromHash(ris[i]).then(resolve);
            }))
          }
          console.log('dentro la richiesta')
          Promise.all(promises).then(resolve)

        })
        //eliminare gli eliminati

        //eliminare quelli che hanno un'ultima modifica
      })
    }

  }
}());


export default business;
