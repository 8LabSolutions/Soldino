import government from "../facade/government"
import user from "../facade/user"
import {getCitizenList, getBusinessList, getGovernmentBalanceAndTotalAmount, setVATrefund, setPeriod, setVATPeriod} from "../actions/government"
import {CITIZEN, BUSINESS} from "../constants/actionTypes"
import {store} from "../store/index"
import { businessStatus } from "../constants/fixedValues";

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

    setVATrefund: function(period){
      /*return new Promise((resolve)=>{*/
        let list = [
          {name: "Azienda 1", VATnumber: "54623102359", paymentStatus: businessStatus.payed, amount: 382.14, address: "address"},
          {name: "Azienda 2", VATnumber: "54210567953", paymentStatus: businessStatus.deferred, amount: 24.50, address: "address"},
          {name: "Azienda 3", VATnumber: "97652134056", paymentStatus: businessStatus.paying, amount: 576.2, address: "address"},
          {name: "Azienda 4", VATnumber: "54615064254", paymentStatus: businessStatus.waiting, amount: 542.23, address: "address"},
          {name: "Azienda 5", VATnumber: "97845160506", paymentStatus: businessStatus.late, amount: 95.6, address: "address"}
        ];
        return setVATrefund(list)
        //resolve(setVATrefund(list))
      //})
    },

    getVATPeriods: function(){
      let periods = ["2019-1", "2019-2", "2019-3", "2019-4"]
      return setVATPeriod(periods)
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

    }
  }

}())

export default governmentActionCreator;
