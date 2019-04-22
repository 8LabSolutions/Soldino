import government from "../facade/government"
import user from "../facade/user"
import {getUserList, getGovernmentBalanceAndTotalAmount} from "../actions/government"


const governmentActionCreator = (function(){
  return{
    getUserList: function(amount, index){
      return new Promise((resolve)=>{
        government.getCitizenList(amount, index).then((results)=>{
          //resolves the getUserListAction
          resolve(getUserList(results))
        })
        .catch(()=>{
          //should resolve an error that says "No user found."
        })
      })
    },

    getBalanceAndTotalAmount: function(){
      return new Promise((resolve)=>{
        //prendere l'amount ed il totale dei cubit
        government.getTotalCubit().then((total)=>{
          user.getBalance().then((balance)=>{
            resolve(getGovernmentBalanceAndTotalAmount(balance, total))
          })
        })
      })

    },
    mint: function(amount){
      return new Promise((resolve)=>{
        government.mint(amount)
        .then(()=>{
          resolve(this.getBalanceAndTotalAmount())
        })
        .catch(()=>{
          //should resolve an error that says "Minting not possible.."
        })
      })
    },

    distribute: function(amount, address){
      return new Promise((resolve)=>{
        government.distribute(amount, address)
        .then(()=>{
          resolve(this.getBalanceAndTotalAmount())
        })
        .catch(()=>{
          //should resolve an error that says "Minting not possible.."
        })
      })
    }
  }

}())

export default governmentActionCreator;
