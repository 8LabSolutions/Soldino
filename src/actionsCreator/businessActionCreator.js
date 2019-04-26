import business from "../facade/business"
import {getMyProducts, getStoreProducts}  from "../actions/business"

const businessActionCreator = (function(){
  return {
    getStoreProducts: function(amount, index){
      return new Promise((resolve)=>{
        business.getStoreProduct(amount, index).then((results)=>{
          resolve(getStoreProducts(results));
        })
        .catch(()=>{
          //should resolve with an error message
        })
      })
    },

    getMyProducts: function(amount, index){
      return new Promise((resolve)=>{
        business.getSenderProduct(amount, index).then((results)=>{
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
    },

    modifyProduct: function(keyProd, title, description, netPrice, vatPercentage, image, sellerName, sellerVATNumber){
      return new Promise((resolve)=>{
        business.modifyProduct(keyProd, title, description, netPrice, vatPercentage, image, sellerName, sellerVATNumber)
        .then(resolve)
      })
    },

    deleteProduct: function(keyProd){
      return new Promise((resolve)=>{
        business.deleteProduct(keyProd)
        .then(resolve)
      })
    },

    getTotalStoreProduct: function(){
      return new Promise((resolve)=>{
        business.getTotalStoreProduct()
        .then(resolve)
      })
    },

    getTotalMyProduct: function(){
      return new Promise((resolve)=>{
        business.getTotalMyProduct()
        .then(resolve)
      })
    }

  }
}());

export default businessActionCreator;
