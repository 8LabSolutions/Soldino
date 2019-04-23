import business from "../facade/business"
import getMyProducts from "../actions/business"

const businessActionCreator = (function(){
  return {
    getProducts: function(amount, index){
      return new Promise(()=>{
        business.getStoreProduct(amount).then(()=>{
          console.log('TODO'+index)
          //resolve(getStoreProducts(results));
        })
        .catch(()=>{
          //should resolve with an error message
        })
      })
    },

    getMyProducts: function(amount, index){
      return new Promise((resolve)=>{
        business.getSenderProduct(amount).then((results)=>{
          console.log('TODO'+index)
          resolve(getMyProducts(results));
        })
        .catch(()=>{
          //should resolve with an error message
        })
      })
    },

    addProduct: function(title, description, netPrice, vatPercentage, image, sellerName, sellerVATNumber){
      return new Promise((resolve)=>{
        business.addProduct(title, description, netPrice, vatPercentage, image, sellerName, sellerVATNumber)
        .then(resolve)
      })
    }

  }
}());

export default businessActionCreator;
