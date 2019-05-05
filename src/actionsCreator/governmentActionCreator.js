import government from "../facade/government"
import user from "../facade/user"
import {getCitizenList, getBusinessList, getGovernmentBalanceAndTotalAmount, setVATrefund, setVATPeriod, resetVATPeriods, resetPeriod, setStatus, resetVAT} from "../actions/government"
import {CITIZEN, BUSINESS} from "../constants/actionTypes"
import {store} from "../store/index"
import { searchaction } from "../actions/searchaction";

const governmentActionCreator = (function(){
  return{
    /**
     * @description Get the list of all registered users.
     * @returns The function returns a promise that resolves the receivement of the users, otherwise rejects an error.
     * @param {*} number of users
     * @param {*} index of first user (firstUser.position === index*amount)
     * @param {*} type of users [CITIZEN, BUSINESS]
     */
    getUserList: function(amount, index, type){
      if(type === CITIZEN)
        return new Promise((resolve)=>{
          government.getCitizenList(amount, index).then((results)=>{
            //get all Citizens
            resolve(getCitizenList(results))
          })
          .catch(()=>{
            //should resolve an error that says "No user found."
          })
        })
      if(type === BUSINESS)
        return new Promise((resolve)=>{
          government.getBusinessList(amount, index).then((results)=>{
            //get all Businesses
            resolve(getBusinessList(results))
          })
          .catch(()=>{
            //should resolve an error that says "No user found."
          })
        })
    },
    /**
     * @returns Returns an array of the business JSON with the VAT period info
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

    /**
     * @description Get the list of all quarters.
     * @returns The function returns a promise that resolves the receivement of the quarters, otherwise rejects an error.
     */
    getVATPeriods: function(){
      return new Promise((resolve)=>{
        government.getPeriods()
        .then((periods)=>{
          resolve(setVATPeriod(periods))
        })
      })

    },

    /**
     * @description Get the government current balance in CC and the total amount.
     * @returns The function returns a promise that resolves the receivement of the balance and total amount, otherwise rejects an error.
     */
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

    /**
     * @description Mint an amount of Cubit.
     * @returns The function returns a promise that resolves the completion of the mint operation, otherwise rejects an error.
     * @param {*} amount in CC to mint
     */
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

    /**
     * @description Distribute an amount of Cubit to a specific address.
     * @returns The function returns a promise that resolves the completion of the distribute operation, otherwise rejects an error.
     * @param {*} amount in CC to distribute
     * @param {*} address, where to send the CC
     */
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

    /**
     * @description Enable or disable a user.
     * @returns The function returns a promise that resolves the completion of the state change operation, otherwise rejects an error.
     * @param {*} address of the user
     * @param {*} new state
     * @param {*} type of user [CITIZEN, BUSINESS]
     */
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

    /**
     * @description Reset the list of periods into the redux store.
     * @returns resetVATPeriods redux action.
     */
    resetPeriods: function(){
      return(resetVATPeriods())
    },

    /**
     * @description Reset the invoices list into the redux store.
     * @returns resetVAT redux action.
     */
    resetVAT: function(){
      return(resetVAT())
    },

    /**
     * @description Reset the searched string into the redux store.
     * @returns searchaction redux action with blank searched string.
     */
    resetSearch: function(){
      return(searchaction(""))
    },

    /**
     * @description Reset the selected period into the redux store.
     * @returns resetPeriod redux action.
     */
    resetPeriod: function(){
      return(resetPeriod())
    },

    /**
     * @description Set a specific status into the redux store, for optimizing the search of the VAT list.
     * @returns setStatus redux action.
     * @param {*} The status can be [deferred, late, payed, paying, waiting].
     */
    setStatus: function(status){
      return(setStatus(status))
    }
  }

}())

export default governmentActionCreator;
