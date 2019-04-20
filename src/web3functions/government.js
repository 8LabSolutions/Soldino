import web3util from "./web_util"
import UserLogic from "../contracts_build/Purchase"
import TokenCubit from "../contracts_build/TokenCubit"

const web3government = (function(){
  //initialize web3
  web3util.init()

  return {
    enableAccount: function(userAddress){
      return new Promise((resolve)=>{
        web3util.getContractInstance(UserLogic).then((userLogicInstance)=>{
          web3util.getCurrentAccount().then((account)=>{
            userLogicInstance.methods.setUserState(userAddress, true).send({from: account})
            .then(resolve)
          })
        })
      })
    },

    disableAccount: function(userAddress){
      return new Promise((resolve)=>{
        web3util.getContractInstance(UserLogic).then((userLogicInstance)=>{
          web3util.getCurrentAccount().then((account)=>{
            userLogicInstance.methods.setUserState(userAddress, false).send({from: account})
            .then(resolve)
          })
        })
      })
    },

    mint: function(amount){
      return new Promise((resolve)=>{
        web3util.getContractInstance(TokenCubit).then((tokenInstance)=>{
          web3util.getCurrentAccount().then((account)=>{
            tokenInstance.methods.mintToken(account, amount).send({from: account})
            .then(resolve)
          })
        })
      })
    },

    distribute: function (amount, address){
      return new Promise((resolve)=>{
        web3util.getContractInstance(TokenCubit).then((tokenInstance)=>{
          web3util.getCurrentAccount().then((account)=>{
            tokenInstance.methods.mintToken(address, amount*web3util.TOKENMULTIPLIER)
            .send({from: account})
            .then(resolve)
          })
        })
      })
    },

    refundVAT: function(businessAddress, period){
      return new Promise((resolve)=>{
        web3util.getContractInstance(TokenCubit).then((tokenInstance)=>{
          web3util.getCurrentAccount().then((account)=>{
            tokenInstance.methods.createVatKey(businessAddress, period)
            .call({from:account})
            .then((key)=>{
              tokenInstance.methods.refundVat(key)
              .send({from:account})
              .then(resolve)
            })
          })
        })
      })
    },
    /**
     * @returns Return a list of <amount> citizens JSON, with the corresponding state
     *  starting from the <amount*index> th
     * @param {*} amount the maximum number of citizens returned
     * @param {*} index the starting (skipping the first amount*index citizens)
     * @description uses the events emitted by solidity to get the information about the citizens
     */
    getCitizenList: function(amount, index){
      console.log('TODO'+amount+index)
      //collect all the citizen address

      //get the status of the citizen (abled/disabled)

      //get all the infos from IPFS
    },
     /**
     * @returns Return a list of <amount> businesses JSON, with the corresponding state
     *  starting from the <amount*index> th
     * @param {*} amount the maximum number of businesses returned
     * @param {*} index the starting (skipping the first amount*index businesses)
     * @description uses the events emitted by solidity to get the information about the businesses
     */

    getBusinessList: function(amount, index){
      console.log('TODO'+amount+index)
      //collect all the citizens address

      //get the status of the citizens (abled/disabled)

      //get all the infos from IPFS
    },
     /**
     * @returns Return a list of <amount> businesses JSON, with the corresponding VAT balance
     *  starting from the <amount*index> th
     * @param {*} amount the maximum number of businesses returned
     * @param {*} index the starting (skipping the first amount*index businesses)
     * @description uses the events emitted by solidity to get the information about the businesses
     */
    getVATQuarterInfo: function(period){
      console.log('TODO'+period)

    }


  }

}());

export default web3government;
