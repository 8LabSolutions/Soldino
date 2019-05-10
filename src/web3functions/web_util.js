import Web3 from 'web3';
import ContractManager from "../contracts_build/ContractManager"
import TokenCubit from "../contracts_build/TokenCubit"
import { round } from '../auxiliaryFunctions';

const web3util = (function() {
  var bs58 = require('bs58');
  var web3js = undefined;

  /**
   * @description Initialize the Web3 provider, unlocks MetaMask asking the user permission to use
   * the site, check if there is at least an account
   */
  function init(){
    return new Promise((resolve, reject)=> {
      //if web3 is already been setted
      if (web3js !== undefined)
        resolve(web3js)
      //if web3 isn't already been setted, get an instance connected to MetaMask
      if(typeof web3 !== 'undefined' && typeof window != 'undefined') {
          window.ethereum.enable().then((accounts)=>{
          web3js = new Web3(window.ethereum);
          if(accounts[0] === undefined){
            reject("No ethereum key identified");
          }
          resolve(web3js)
        }).catch(()=>{
          reject("User refused to grant the access to the site");
        })
      } else{
        reject("Metamask not found");
      }
    });
  }
  /**
     * @returns Promise: returns the current active account on MetaMask,
     * otherwise rejects with an error
     */
  async function getCurrentAccount(){
    if (web3js === undefined)
        await init()

    return new Promise(async (resolve, reject) =>{
      //if there is no web3 instance reject with an error
      if (web3js === undefined)
        await init()

      web3js.eth.getAccounts()
      .then((account)=>{
        resolve(account[0])
      })
      .catch(()=>{
        reject("Error trying to get the active account on MetaMask, please check if you're logged in into MetaMask");
      })
    })
  }
  /**
     * @description The function ask the current deployment address from the ContractManager,
     * and returns the instance
     * @returns The contract instance of the JSON
     * @param {*} contractJSON The JSON representing the compiled contract, obtained from truffle-compile
     * command
     */
  async function getContractInstance(contractJSON){
    if (web3js === undefined)
        await init()

    let contractManagerInstance;
    return new Promise((resolve, reject)=>{
      web3js.eth.net.getId()
      .then((id)=>{
        //getting the contract manager instance
        contractManagerInstance = new web3js.eth.Contract(ContractManager.abi,
          ContractManager.networks[id].address);
        //getting the deployment address of the Passed contract
        contractManagerInstance.methods.getContractAddress(contractJSON.contractName)
        .call()
        .then((_contractAddress)=>{
          //getting the instance of the deployed contract
          var instance = new web3js.eth.Contract(contractJSON.abi, _contractAddress);
          resolve(instance)
        })
        .catch(()=>{
          reject("Error retriving the Contract "+contractJSON.contractName+" in the ContractManager, it is possible that the name of the contract is wrong")
        })
      })
      .catch(()=>{
        reject("Error retrieving the network ID, check the Web3 Object instance")
      })
    })
  }

  //initialize web3
  init();

  return {

    init: init,
    /**
     * @returns The corresponding VAT period in the format YYYY-MM, starting from a YYYY year and a MM month
     *
     * @param {*} month month in NUMBER(1-12)
     * @param {*} year year in NUMBER
     */
    getVATPeriod: function(month = undefined, year = undefined){
      var today = new Date();
      var mm = (month === undefined ? today.getMonth()+1 : month);
      var yyyy = (year === undefined ? today.getFullYear() : year);
      var period = parseInt(mm/4) +1;
      return String(yyyy).concat("-").concat(String(period))
    },
    /**
     * @returns Promise: returns the current active account on MetaMask,
     * otherwise rejects with an error
     */
    getCurrentAccount: getCurrentAccount,
    /**
     * @returns Return an array in the following format [remainingHash, size, fun], where:
     * \t 1) remainingHash: the ID of the object
     * \t 2) size: the size of the contained object
     * \t 3) fun: the function ID use to build the hash
     * @param {*} hash IPFS CID (hash) to be splitted
     */
    splitIPFSHash: function(hash){
      hash = new Buffer(bs58.decode(hash))
      let fun = parseInt(hash[0]);
      let size = parseInt(hash[1]);
      let remainingHash = "0x"
      for(let i =2; i<34; i++){
        let add = hash[i].toString(16)
        if(add.length<2){
          add = String("0").concat(add)
        }
        remainingHash =  remainingHash.concat(add)
      }
      return [remainingHash, size, fun];
    },
    /**
     * @description Returns the IPFS CID starting from the ID, the function and the size of the object
     * @return The IPFS CID (hash)
     * @param {*} remainingHash the ID of the object
     * @param {*} size the size of the contained object
     * @param {*} fun the function ID use to build the hash
     */
    recomposeIPFSHash: function(remainingHash, size, fun){
        var array = [parseInt(fun), parseInt(size)]
        for (let i = 2; i<66; i+=2){
          array.push(parseInt(remainingHash.toString().substring(i,i+2),16))
        }
        var buffer = new Buffer(array)
        return bs58.encode(buffer)
    },

    /**
     * @description The function ask the current deployment address from the ContractManager,
     * and returns the instance
     * @returns The contract instance of the JSON
     * @param {*} contractJSON The JSON representing the compiled contract, obtained from truffle-compile
     * command
     */
    getContractInstance: getContractInstance,
    /**
     * @description This function request the permission to let the passed Contract to withdraw
     * the passed amount of Cubit. USe this function when a contract must withdraw, and the msg.sender
     * in the solidity function is a contract instead of a user address.
     * @param {*} amount The amount to be withdraw
     * @param {*} contractJSON The JSON of the contract that must have the permissions to withdraw.
     * The contract Manager will be used to get the current deployed instance.
     */
    tokenTransferApprove: function(amount, contractJSON) {
      return new Promise((resolve, reject)=>{
        getContractInstance(TokenCubit)
        .then((tokenInstance)=>{
          getContractInstance(contractJSON)
          .then((contractInstance)=>{
            getCurrentAccount()
            .then((account)=>{
              tokenInstance.methods.approve(contractInstance.options.address, parseInt(round(amount)*web3util.TOKENMULTIPLIER)+1)
              .send({from: account})
              .then(resolve)
              .catch(()=>{
                reject("The approval failed with the following error")
              })
            })
            .catch(reject)
          })
          .catch(reject)
        })
        .catch(reject)
      })
    },
    //constant to multiply the amounts in order to get more precision in the solidity's functions
    TOKENMULTIPLIER : 100
  }
}())

export default web3util;
