//module to get an IPFS instance
const IPFS = require('ipfs-mini');
//connection to IPFS
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });


var ipfsModule = (function() {
  return {
    /**
     * @returns The JSON object corresponding to the given CID
     * @param {*} hash The IPFS CID has you want to get the JSON
     */
    getJSONfromHash: function(hash) {
      return new Promise((resolve, reject)=>{
        ipfs.catJSON(hash)
        .then(resolve)
        .catch((err)=>{
          reject("It seems like IPFS API are not working in this moment :( Please try later.\n Error: "+err)
        })
      })

    },
    /**
     * @returns The IPFS CID related to the uploaded JSON
     * @param {*} productJSON The JSON you want to save to IPFS
     */
    insertJSONintoIPFS: function(productJSON) {
      return new Promise((resolve, reject)=>{
        ipfs.addJSON(productJSON)
        .then(resolve)
        .catch((err)=>{
          reject("It seems like IPFS API are not working in this moment :( Please try later.\n Error: "+err)
        })
      })

    }
  }
}());

module.exports = ipfsModule;
