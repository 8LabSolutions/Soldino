import government from "../facade/government"
import user from "../facade/user"
import {getCitizenList, getBusinessList, getGovernmentBalanceAndTotalAmount, setVATrefund, setVATPeriod, resetVATPeriods, resetPeriod, setStatus, resetVAT} from "../actions/government"
import {CITIZEN, BUSINESS} from "../constants/actionTypes"
import {store} from "../store/index"
import { searchaction } from "../actions/searchaction";

const governmentActionCreator = (function(){
  return{
    getUserList: function(amount, index, type){
      if(type === CITIZEN)
        return new Promise((resolve)=>{
          government.getCitizenList(amount, index).then((results)=>{
            //resolves the getUserListAction
            resolve(getCitizenList(results))
          })
          .catch(()=>{
            //should resolve an error that says "No user found."
          })
        })
      if(type === BUSINESS)
        return new Promise((resolve)=>{
          government.getBusinessList(amount, index).then((results)=>{
            //resolves the getUserListAction
            resolve(getBusinessList(results))
          })
          .catch(()=>{
            //should resolve an error that says "No user found."
          })
        })
    },
    /**
     * @returns Return an array of the business JSON with the VAT period info
     * @param {*} period the VAT period you want to get the business info
     */
    setVATrefund: function(period){
      return new Promise((resolve)=>{
        government.getBusinessVATState(period)
        .then((businessStateArray)=>{
          resolve(setVATrefund(businessStateArray))
        })
      })
    },

    getVATPeriods: function(){
      return new Promise((resolve)=>{
        government.getPeriods()
        .then((periods)=>{
          resolve(setVATPeriod(periods))
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
    },

    changeUserState: function(address, state, type){
      return new Promise((resolve)=>{
        var stateAction;
        if(state === true)
          stateAction = government.disableAccount
        else
          stateAction = government.enableAccount
        stateAction(address).then(()=>{
          if(type === CITIZEN){
            let newList = store.getState().citizenList;
            for (let i = 0; i < newList.length; i++){
              if(newList[i].address === address){
                newList[i].state = !state
              }
            }
            resolve(getCitizenList(newList));
          }
          if(type === BUSINESS){
            let newList = store.getState().businessList;
            for (let i = 0; i < newList.length; i++){
              if(newList[i].address === address){
                newList[i].state = !state
              }
            }
            resolve(getBusinessList(newList));
          }
        })
      })
    },
    refund: function(address, period, amount){
      return new Promise((resolve)=>{
        government.refund(period, address, amount)
        .then(resolve)
      })

    },

    resetPeriods: function(){
      return(resetVATPeriods())
    },

    resetVAT: function(){
      return(resetVAT())
    },

    resetSearch: function(){
      return(searchaction(""))
    },

    resetPeriod: function(){
      return(resetPeriod())
    },

    setStatus: function(status){
      return(setStatus(status))
    }
  }

}())

export default governmentActionCreator;
