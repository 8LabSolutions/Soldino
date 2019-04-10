import Web3 from 'web3';

const web3util = (function() {
  var bs58 = require('bs58');

  return {
    getWeb3: async function() {
      var web3js;
      if (typeof web3 !== 'undefined' && typeof window != 'undefined') {
        await window.ethereum.enable();
        web3js = new Web3(window.web3.currentProvider);
      } else{
        web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
      }
      return web3js;
    },

    splitIPFSHash: async function(hash){
      hash = new Buffer(bs58.decode(hash))
      let fun = parseInt(hash[0]);
      let size = parseInt(hash[1]);
      let remainingHash = "0x"
      for(var i =2; i<34; i++){
        remainingHash+= hash[i].toString(16)
      }
      return [remainingHash, size, fun];
    },

    recomposeIPFSHash: function(remainingHash, size, fun){
        var array = [fun, size]
        for (var i = 2; i<66; i+=2){
          array.push(parseInt(remainingHash.toString().substring(i,i+2),16))
        }
        var buffer = new Buffer(array)
        return bs58.encode(buffer)
    }

  }
}())

export default web3util;
