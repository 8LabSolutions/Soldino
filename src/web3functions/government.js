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
    /**
     * @description Returns a promise, resolve if the user has been enabled,
     * reject with an error otherwise
     * @param {*} userAddress The address of the user to be enabled
     */
    enableAccount: function(userAddress){
      return new Promise((resolve, reject)=>{
        web3util.getContractInstance(UserLogic)
        .then((userLogicInstance)=>{
          web3util.getCurrentAccount()
          .then((account)=>{
            userLogicInstance.methods.setUserState(userAddress, true)
            .send({from: account})
            .then(resolve)
            .catch(()=>{
              reject("Enabling went wrong")
            })
          })
          .catch(reject)
        })
        .catch(reject)
      })
    },
    /**
     * @description Returns a promise, resolve if the user has been disabled,
     * reject with an error otherwise
     * @param {*} userAddress The address of the user to be disabled
     */
    disableAccount: function(userAddress){
      return new Promise((resolve, reject)=>{
        web3util.getContractInstance(UserLogic)
        .then((userLogicInstance)=>{
          web3util.getCurrentAccount()
          .then((account)=>{
            userLogicInstance.methods.setUserState(userAddress, false)
            .send({from: account})
            .then(resolve)
            .catch(()=>{
              reject("Disabling went wrong")
            })
          })
          .catch(reject)
        })
        .catch(reject)
      })
    },
    /**
     * @description Returns a promise that resolves if the amount passed has been mined,
     * reject with an error otherwise
     * @param {*} amount
     */
    mint: function(amount){
      return new Promise((resolve, reject)=>{
        web3util.getContractInstance(TokenCubit)
        .then((tokenInstance)=>{
          web3util.getCurrentAccount()
          .then((account)=>{
            tokenInstance.methods.mintToken(account, round(amount*web3util.TOKENMULTIPLIER))
            .send({from: account})
            .then(resolve)
            .catch(()=>{
              reject("Minting the passed amount went wrong")
            })
          })
          .catch(reject)
        })
        .catch(reject)
      })
    },
    /**
     * @description Returns a promise that resolves if the amount passed has been transfered
     * to the given address, reject with an error otherwise
     * @param {*} amount The amount of Cubit to be transferred
     * @param {*} address The address to transfer the Cubit to
     */
    distribute: function (amount, address){
      return new Promise((resolve, reject)=>{
        web3util.getContractInstance(TokenCubit)
        .then((tokenInstance)=>{
          web3util.getCurrentAccount()
          .then((account)=>{
            tokenInstance.methods.transfer(address, round(amount*web3util.TOKENMULTIPLIER))
            .send({from: account, gas: 500000})
            .on("Tranfer", ()=>{
              console.log("transfer")
            })
            .then((x)=>{
              console.log(x)
              resolve(x)
            })
            .catch(()=>{
              console.log("NOOOO")
              reject("The distribution went wrong")
            })
          })
          .catch(reject)
        })
        .catch(reject)
      })
    },
    /**
     * @description Returns a promise that resolves if the amount passed has been transfered
     * to the given addresses, reject with an error otherwise
     * @param {*} amount The amount of Cubit to be transferred to each account
     * @param {*} address The addresses to transfer the Cubit to
     */
    distributeToMultipleAddresses: function (addresses, amount){
      return new Promise((resolve, reject)=>{
        web3util.getContractInstance(TokenCubit)
        .then((tokenInstance)=>{
          web3util.getCurrentAccount()
          .then((account)=>{
            tokenInstance.methods.distributeToMultipleAddresses(addresses, round(amount*web3util.TOKENMULTIPLIER))
            .send({from: account})
            .then(resolve)
            .catch(()=>{
              reject("The distribution went wrong")
            })
          })
          .catch(reject)
        })
        .catch(reject)
      })
    },
    /**
     * @describe Returns a promise that resolves if VAT period of the business passed has been refunded correctly
     * @param {*} businessAddress business address you want to pay
     * @param {*} period the VAT period you want to refund
     */
    refundVAT: function(businessAddress, period, amount){
      return new Promise((resolve, reject)=>{
        web3util.getContractInstance(VatLogic)
        .then((vatLogicInstance)=>{
          //approve the withdraw
          web3util.tokenTransferApprove(parseInt(round(amount*web3util.TOKENMULTIPLIER)), VatLogic)
          .then(()=>{
            web3util.getCurrentAccount()
            .then((account)=>{
              vatLogicInstance.methods.createVatKey(businessAddress, period)
              .call({from:account})
              .then((key)=>{
                vatLogicInstance.methods.refundVat(key)
                .send({from:account})
                .then(resolve)
                .catch(()=>{
                  reject("Unable to refund the given period")
                })
              })
            })
            .catch(()=>{
              reject("Unable to get the VAT key for the given period")
            })
          })
          .catch(reject)
        })
        .catch(reject)
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
      return new Promise((resolve, reject)=>{
        web3util.getContractInstance(UserLogic)
        .then((userLogicInstance)=>{
          web3util.getCurrentAccount()
          .then((account)=>{
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
            .catch(()=>{
              reject("Error trying to get the UserInserted events")
            })
          })
          .catch(reject)
        })
        .catch(reject)
      })
    },
    /**
     * @returns The function returns a promise that resolves with the current total supply of Cubit on Soldino
     */
    getTotalCubit: function(){
      return new Promise((resolve, reject)=>{
        web3util.getContractInstance(TokenCubit)
        .then((tokenInstance)=>{
          web3util.getCurrentAccount()
          .then((account)=>{
            tokenInstance.methods.totalSupply()
            .call({from: account})
            .then((amount)=>{
              if(amount!==0)
                amount/=web3util.TOKENMULTIPLIER;
              resolve(round(amount));
            })
            .catch(()=>{
              reject("Unable to get the total supply")
            })

          })
          .catch(reject)
        })
        .catch(reject)
      })
    },
    /**
     * @return get all the IPFS addresses of the businesses' invoices
     */
    getInvoicesGovernment: function() {
      //must get all the purchase order and the selling order
      return new Promise((resolve, reject)=>{
        web3util.getContractInstance(OrderLogic)
        .then((orderLogicInstance)=>{
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
                    web3util.getContractInstance(OrderLogic)
                    .then((orderLogicInstance)=>{
                      web3util.getCurrentAccount().then((account)=>{
                        orderLogicInstance.methods.getOrderCid(invoicesKey[j])
                        .call({from: account})
                        .then((hashParts)=>{
                          resolve(web3util.recomposeIPFSHash(hashParts[0], hashParts[2], hashParts[1]))
                        })
                        .catch(()=>{
                          reject("Error trying to get the order CID")
                        })
                      })
                    })
                    .catch(reject)
                  })
                )
              }
              Promise.all(invoicesIPFS).then(resolve)
            })
            .catch(()=>{
              reject("Error trying to get the SellOrderInserted events")
            })
          })
          .catch(()=>{
            reject("Error trying to get the PurchaseOrderInserted events")
          })
        })
        .catch(reject)
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
      return new Promise((resolve, reject)=>{
        web3util.getContractInstance(VatLogic)
        .then((vatLogicInstance)=>{
          vatLogicInstance.methods.createVatKey(businessAddress, period)
          .call()
          .then((key)=>{
            vatLogicInstance.methods.getVatData(key)
            .call()
            .then((ris)=>{
              //arrives in the following order [businessAddress, state, amount]
              resolve([ris[0], ris[1], round(ris[2]/web3util.TOKENMULTIPLIER)])
            })
            .catch(()=>{
              reject("Unable to get the VAT data for the given key")
            })
          })
          .catch(()=>{
            reject("Unable to get the VAT key for the given period")
          })
        })
        .catch(reject)
      })
    }
  }
}());

export default web3government;
