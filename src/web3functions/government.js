import web3util from "./web_util"
import UserLogic from "../contracts_build/UserLogic"
import TokenCubit from "../contracts_build/TokenCubit"
import OrderLogic from "../contracts_build/OrderLogic"
import VatLogic from "../contracts_build/VatLogic"
import { round } from "../auxiliaryFunctions";

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
            tokenInstance.methods.mintToken(account, amount*web3util.TOKENMULTIPLIER)
            .send({from: account})
            .then(resolve)
          })
        })
      })
    },

    distribute: function (amount, address){
      return new Promise((resolve)=>{
        web3util.getContractInstance(TokenCubit).then((tokenInstance)=>{
          web3util.getCurrentAccount().then((account)=>{
            tokenInstance.methods.transfer(address, amount*web3util.TOKENMULTIPLIER)
            .send({from: account})
            .then(resolve)
          })
        })
      })
    },

    distributeToMultipleAddresses: function (addresses, amount){
      return new Promise((resolve)=>{
        web3util.getContractInstance(TokenCubit).then((tokenInstance)=>{
          web3util.getCurrentAccount().then((account)=>{
            tokenInstance.methods.distributeToMultipleAddresses(addresses, amount*web3util.TOKENMULTIPLIER)
            .send({from: account})
            .then(resolve)
          })
        })
      })
    },
    /**
     * @describe Refund the business on the VAT period passed
     * @param {*} businessAddress business address you want to pay
     * @param {*} period the VAT period you want to refund
     */
    refundVAT: function(businessAddress, period, amount){
      return new Promise((resolve)=>{
        web3util.getContractInstance(VatLogic).then((vatLogicInstance)=>{
          web3util.getContractInstance(TokenCubit).then((tokenInstance)=>{
            web3util.getCurrentAccount().then((account)=>{
              tokenInstance.methods.approve(vatLogicInstance.options.address, parseInt(round(amount*web3util.TOKENMULTIPLIER)))
              .send({from: account})
              .then(()=>{
                web3util.getCurrentAccount().then((account)=>{
                  vatLogicInstance.methods.createVatKey(businessAddress, period)
                  .call({from:account})
                  .then((key)=>{
                    vatLogicInstance.methods.refundVat(key)
                    .send({from:account})
                    .then(resolve)
                  })
                })
              })
            })
          })
        })
      })
    },
    /**
     * @returns Return a list of arrays with [address, IPFSHash, state]
     * @param {*} type the type of user
     * @param {*} amount the maximum number of users returned
     * @param {*} index the starting (skipping the first amount*index users)
     * @description uses the events emitted by solidity to get the information about the users
     */
    getUserList: function(type, amount, index=0){
      return new Promise((resolve)=>{
        web3util.getContractInstance(UserLogic).then((userLogicInstance)=>{
          web3util.getCurrentAccount().then((account)=>{
            //*** 1 - getting the addresses ***
            var users = []
            userLogicInstance.getPastEvents('UserInserted', {
              //filtering by the citizen
              filter: {_userType: type},
              fromBlock: 0,
              toBlock: 'latest'
            })
            .then((events) => {
              //take the events from the i-th to
              let start = index*amount;
              for (let i = start; i < start + amount && start + i < events.length; i++){
                //extracting only the hash
                users.push(events[i].returnValues._userAddress)
              }

              //*** 2 - getting the user info, remaining hash, hashFun, hashSize, state
              var userInfo =  [];
              for (let i = 0; i < users.length; i++){
                userInfo.push(new Promise((resolve)=>{
                  userLogicInstance.methods.getUserInfo(users[i])
                  .call({from: account})
                  .then((infos)=>{
                    let userIPFSHash = web3util.recomposeIPFSHash(infos[0], infos[2], infos[1]);
                    resolve([users[i], userIPFSHash, infos[3]]);
                  })
                }))
              }
              Promise.all(userInfo).then(resolve)
            })
          })
        })
      })
    },
    /**
     * @returns the total supply of Cubit
     */
    getTotalCubit: function(){
      return new Promise((resolve)=>{
        web3util.getContractInstance(TokenCubit).then((tokenInstance)=>{
          web3util.getCurrentAccount().then((account)=>{
            tokenInstance.methods.totalSupply().call({from: account})
            .then((amount)=>{
              if(amount!==0)
                amount/=web3util.TOKENMULTIPLIER;
              resolve(amount);
            })
          })

        })
      })
    },
    /**
     * @return get all the IPFS addresses of the businesses' invoices
     */
    getInvoicesGovernment: function() {
      //must get all the purchase order and the selling order
      return new Promise((resolve)=>{
        web3util.getContractInstance(OrderLogic).then((orderLogicInstance)=>{
          var query;

          query = {
            fromBlock: 0,
            toBlock: 'latest'
          }

          var invoicesKey = []

          orderLogicInstance.getPastEvents("PurchaseOrderInserted", query)
          .then((events)=>{
            for(let i = 0; i < events.length; i++){
              invoicesKey.push(events[i].returnValues._keyHash);
            }

            orderLogicInstance.getPastEvents("SellOrderInserted", query)
            .then((events)=>{
              for(let i = 0; i < events.length; i++){
                invoicesKey.push(events[i].returnValues._keyHash);
              }
              //invoicesKey contains all the 32byte key, getting the IPFS hashes
              var invoicesIPFS = []
              for (let j = 0; j < invoicesKey.length; j++){
                invoicesIPFS.push(
                  new Promise((resolve)=>{
                    web3util.getContractInstance(OrderLogic).then((orderLogicInstance)=>{
                      web3util.getCurrentAccount().then((account)=>{
                        orderLogicInstance.methods.getOrderCid(invoicesKey[j])
                        .call({from: account})
                        .then((hashParts)=>{
                          resolve(web3util.recomposeIPFSHash(hashParts[0], hashParts[2], hashParts[1]))
                        })
                      })
                    })
                  })
                )
              }
              Promise.all(invoicesIPFS).then(resolve)
            })
          })
        })

      })
    },
    /**
     * @returns Return the following info:
     * 1) businessAddress
     * 2) state: [DUE, OVERDUE, PAID, TO_BE_REFUNDED, REFUNDED] enum 0->4
     * 3) amount: VAT amount
     * @param {*} period
     * @param {*} businessAddress
     */
    getVATQuarterInfo: function(period, businessAddress){
      return new Promise((resolve)=>{
        web3util.getContractInstance(VatLogic).then((vatLogicInstance)=>{
          vatLogicInstance.methods.createVatKey(businessAddress, period)
          .call()
          .then((key)=>{
            vatLogicInstance.methods.getVatData(key)
            .call()
            .then((ris)=>{
              //arrives in the following order [businessAddress, state, amount]
              resolve([ris[0], ris[1], ris[2]/web3util.TOKENMULTIPLIER])
            })
          })
        })
      })
    }
  }
}());

export default web3government;
