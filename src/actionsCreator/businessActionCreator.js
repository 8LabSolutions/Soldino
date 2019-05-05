import business from "../facade/business"
import {getMyProducts, getStoreProducts, setInvoices, setPeriods}  from "../actions/business"

const businessActionCreator = (function(){
  return {

    /**
     * @description Generates a list of products in sale and returns it as param by returning a redux action 
     * @returns The function returns a promise that resolves success of getting all products, otherwise rejects an error.
     * @param {*} number of products
     * @param {*} index of first product (firstProduct.position === index*amount)
     */
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

    /**
     * @description Generates a list of products in sale that were added to sell by current logged business and returns it as param by returning a redux action.
     * @returns The function returns a promise that resolves success of getting my products, otherwise rejects an error.
     * @param {*} number of products
     * @param {*} index of first product (firstProduct.position === index*amount)
     */
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

    /**
     * @description Add a product to the store
     * @returns The function returns a promise that resolves success of adding a product, otherwise rejects an error.
     * @param {*} title of the product
     * @param {*} description of the product
     * @param {*} net price of the product
     * @param {*} vat percentage of the product
     * @param {*} image of the product
     * @param {*} seller name of the product
     * @param {*} seller VAT number of the product
     */
    addProduct: function(title, description, netPrice, vatPercentage, image, sellerName, sellerVATNumber){
      return new Promise((resolve)=>{
        business.addProduct(title, description, netPrice, vatPercentage, image, sellerName, sellerVATNumber)
        .then(resolve)
      })
    },

    /**
     * @description Modify a product to the store
     * @returns The function returns a promise that resolves success of modifying a product, otherwise rejects an error.
     * @param {*} title of the product
     * @param {*} description of the product
     * @param {*} net price of the product
     * @param {*} vat percentage of the product
     * @param {*} image of the product
     * @param {*} seller name of the product
     * @param {*} seller VAT number of the product
     */
    modifyProduct: function(keyProd, title, description, netPrice, vatPercentage, image, sellerName, sellerVATNumber){
      return new Promise((resolve)=>{
        business.modifyProduct(keyProd, title, description, netPrice, vatPercentage, image, sellerName, sellerVATNumber)
        .then(resolve)
      })
    },

    /**
     * @description Remove a product from the store
     * @returns The function returns a promise that resolves success of removing a product, otherwise rejects an error.
     * @param {*} key of the product
     */
    deleteProduct: function(keyProd){
      return new Promise((resolve)=>{
        business.deleteProduct(keyProd)
        .then(resolve)
      })
    },

    /**
     * @description Get the number of total products into the store
     * @returns The function returns a promise that resolves the number of products in the store, otherwise rejects an error.
     */
    getTotalStoreProduct: function(){
      return new Promise((resolve)=>{
        business.getTotalStoreProduct()
        .then(resolve)
      })
    },

    /**
     * @description Get the number of total products into the store that were added to sell by current logged business.
     * @returns The function returns a promise that resolves the number of my products in the store, otherwise rejects an error.
     */
    getTotalMyProduct: function(){
      return new Promise((resolve)=>{
        business.getTotalMyProduct()
        .then(resolve)
      })
    },

    /**
     * @description Get all the invoices in a quarter.
     * @returns The function returns a promise that resolves the number of the invoices in a quarter, otherwise rejects an error.
     * @param {*} quarter, it is in the current format: YYYY-i where i is one element into the set [1, 2, 3, 4]
     * for example, 2019-2 means that the quarter is the second of 2019, so from April to June 2019
     */
    getInvoices: function(VATPeriod){
      return new Promise((resolve)=>{
        business.getInvoices(VATPeriod)
        .then((invoices)=>{
          resolve(setInvoices(invoices));
        })
      })
    },

    /**
     * @description Get all the invoices in a quarter related to the current logged business.
     * @returns The function returns a promise that resolves the number of the invoices in a quarter by a specific business, otherwise rejects an error.
     */
    getBusinessPeriod: function(){
      return new Promise((resolve)=>{
        business.getPeriods()
        .then((periods)=>{
          resolve(setPeriods(periods))
        })
      })
    },

    /**
     * @description Execute the instant payment for a quarter to the government.
     * @returns The function returns a promise that resolves the payment, otherwise rejects an error.
     * @param {*} selected period
     * @param {*} amount to pay
     */
    payVATPeriod: function(period, amount){
      return new Promise((resolve)=>{
        business.payVATPeriod(period, amount)
        .then(resolve)
      })
    },

    /**
     * @description Defer the debt of a quarter to the next quarter.
     * @returns The function returns a promise that resolves the deferment, otherwise rejects an error.
     * @param {*} selected period
     */    
    putOnHoldVATPeriod: function(period){
      return new Promise((resolve)=>{
        business.putOnHoldVATPeriod(period)
        .then(resolve)
      })
    }
  }
}());

export default businessActionCreator;
