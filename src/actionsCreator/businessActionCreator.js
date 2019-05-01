import business from "../facade/business"
import {getMyProducts, getStoreProducts, setInvoices, setPeriods}  from "../actions/business"

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
    },

    getInvoices: function(VATPeriod){
      return new Promise((resolve)=>{
        business.getInvoices(VATPeriod)
        .then((invoices)=>{
          resolve(setInvoices(invoices));
        })
      })
    },

    getBusinessPeriod: function(){
      return new Promise((resolve)=>{
        business.getPeriods()
        .then((periods)=>{
          resolve(setPeriods(periods))
        })
      })
    },

    payVATPeriod: function(period){
      return new Promise((resolve)=>{
        business.payVATPeriod(period)
        .then(resolve)
      })
    },

    putOnHoldVATPeriod: function(period){
      return new Promise((resolve)=>{
        business.putOnHoldVATPeriod(period)
        .then(resolve)
      })
    }
  }
}());

export default businessActionCreator;
