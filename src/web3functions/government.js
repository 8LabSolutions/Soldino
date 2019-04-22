import web3util from "./web_util"
import UserLogic from "../contracts_build/UserLogic"
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
     * @returns Return a list of <amount> businesses JSON, with the corresponding VAT balance
     *  starting from the <amount*index> th
     * @param {*} amount the maximum number of businesses returned
     * @param {*} index the starting (skipping the first amount*index businesses)
     * @description uses the events emitted by solidity to get the information about the businesses
     */
    getTotalCubit: function(){
      return new Promise((resolve)=>{
        web3util.getContractInstance(TokenCubit).then((tokenInstance)=>{
          web3util.getCurrentAccount().then((account)=>{
            tokenInstance.methods.totalSupply().call({from: account})
            .then((amount)=>{
              if(amount!=0)
                amount/=web3util.TOKENMULTIPLIER;
              resolve(amount);
            })
          })

        })
      })
    },

    getVATQuarterInfo: function(period){
      console.log('TODO'+period)

    }


  }

}());

export default web3government;
