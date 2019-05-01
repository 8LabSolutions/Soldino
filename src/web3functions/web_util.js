import Web3 from 'web3';
import ContractManager from "../contracts_build/ContractManager"

const web3util = (function() {
  var bs58 = require('bs58');
  var web3js = undefined;

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

  //initialize web3
  init();

  return {
    init: init,
    /**
     * @returns The corresponding VAT period in the format YYYY-MM
     *
     * @param {*} month month in NUMBER(1-12)
     * @param {*} year year in NUMBER
     */
    getVATPeriod: function(month = undefined, year = undefined){
      var today = new Date();
      var mm = (month === undefined ? today.getMonth()+1 : month);
      var yyyy = (year === undefined ? today.getFullYear() : year);
      var period = parseInt(mm/4) +1;
      console.log('used period: '+String(yyyy).concat("-").concat(String(period)))
      return String(yyyy).concat("-").concat(String(period))
    },

    getCurrentAccount: async function(){
      if (web3js === undefined)
          await init()

      return new Promise(async (resolve) =>{
        //if there is no web3 instance reject with an error
        if (web3js === undefined)
          await init()

        web3js.eth.getAccounts().then((account)=>{
          resolve(account[0])
        })
      })
    },

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

    recomposeIPFSHash: function(remainingHash, size, fun){
        var array = [parseInt(fun), parseInt(size)]
        for (let i = 2; i<66; i+=2){
          array.push(parseInt(remainingHash.toString().substring(i,i+2),16))
        }
        var buffer = new Buffer(array)
        return bs58.encode(buffer)
    },

    getContractInstance: async function(contractJSON){
      if (web3js === undefined)
          await init()

      let contractManagerInstance;
      return new Promise((resolve, reject)=>{
        web3js.eth.net.getId().then((id)=>{
          contractManagerInstance = new web3js.eth.Contract(ContractManager.abi,
            ContractManager.networks[id].address);
          contractManagerInstance.methods.getContractAddress(contractJSON.contractName).call()
          .then((_contractAddress)=>{
            var instance = new web3js.eth.Contract(contractJSON.abi, _contractAddress);
            resolve(instance)
          });
        }).catch(reject)
      })
    },
    //constant to multiply the amounts in order to get more precision in the solidity's functions
    TOKENMULTIPLIER : 100
  }
}())

export default web3util;
