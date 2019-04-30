import user from "../facade/user"
import getMyProducts from "../actions/user"

const userActionCreator = (function(){
  return{
    /**
     * @description Return an action of TYPE "GETMYORDERS" and an array containing the orders' JSON
     */
    getOrdersList: function(){
      return new Promise((resolve)=>{
        user.getPurchases().then((purchases)=>{
          resolve(getMyProducts(purchases))
        })
      })
    }
  }

}())

export default userActionCreator;
