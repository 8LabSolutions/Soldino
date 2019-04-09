import Web3 from 'web3';

const web3util = (function() {
  var bs58 = require('bs58');
  return {
    getWeb3: function() {
      var web3js;
      if (typeof web3 !== 'undefined' && typeof window != 'undefined') {
        web3js = new Web3(window.web3.currentProvider);
        window.ethereum.enable();
      } else{
        web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
      }
      return web3js;
    },

    splitIPFSHash: function(hash){
      hash = new Buffer(bs58.decode(hash)).toString(16)
      console.log(hash)
      let part1 = parseInt(hash.substring(0,2),16);
      let part2 = parseInt(hash.substring(2,4),16);
      let remainingHash = hash.substring(4,68);
      return [part1, part2, remainingHash];
    },

    recomposeIPFSHash: function(int1, int2, remainingHash){
      var hash = int1.toString(16) + int2.toString(16) + remainingHash;
      return bs58.encode(new Buffer(hash, 'hex'))
    }
  }
}())

export default web3util;
