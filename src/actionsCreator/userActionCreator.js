import user from "../facade/user"
import { getMyProducts, updateBalance } from "../actions/user"

const userActionCreator = (function(){
  return{
    /**
     * @description Return an action of TYPE "GETMYORDERS" and an array containing the orders' JSON
     */
    getOrdersList: function(){
      return new Promise((resolve, reject)=>{
        user.getPurchases()
        .then((purchases)=>{
          resolve(getMyProducts(purchases))
        })
        .catch(reject)
      })
    },
    /**
     * @returns The function returns the UPDATEBALANCE ACTION with the current account balance
     */
    updateBalance: function(){
      return new Promise((resolve, reject)=>{
        user.getBalance()
        .then((balance)=>{
          resolve(updateBalance(balance))
        })
        .catch(reject)
      })
    }
  }
}())

export default userActionCreator;
