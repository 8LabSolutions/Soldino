//module to get an IPFS instance
const IPFS = require('ipfs-mini');
//connection to IPFS
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });


var ipfsModule = (function() {
  return {
    getJSONfromHash: function(hash) {
      console.log('getting: '+hash)
      return ipfs.catJSON(hash)
    },
    insertJSONintoIPFS: function(productJSON) {
      return ipfs.addJSON(productJSON)
    }
  }
}());

module.exports = ipfsModule;
