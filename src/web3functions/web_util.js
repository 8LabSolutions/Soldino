import Web3 from 'web3';

const web3util = (function() {
  var bs58 = require('bs58');
  return {
    getWeb3: function() {
      return new Promise((resolve, reject)=> {
        var web3js;
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
    },

    splitIPFSHash: async function(hash){
      hash = new Buffer(bs58.decode(hash))
      let fun = parseInt(hash[0]);
      let size = parseInt(hash[1]);
      let remainingHash = "0x"
      for(var i =2; i<34; i++){
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
        for (var i = 2; i<66; i+=2){
          array.push(parseInt(remainingHash.toString().substring(i,i+2),16))
        }
        var buffer = new Buffer(array)
        return bs58.encode(buffer)
    }
  }
}())

export default web3util;
