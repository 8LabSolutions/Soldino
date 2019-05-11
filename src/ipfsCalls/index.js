//module to get an IPFS instance
const IPFS = require('ipfs-http-client');
//connection to IPFS
const ipfs = IPFS('ipfs.infura.io','5001', {protocol: 'https' });
//const ipfs = new IPFSMini({ host: 'localhost', port: '5001', protocol: 'http' });
//const axios = require('axios')

var ipfsModule = (function() {

  return {
    /**
     * @returns The JSON object corresponding to the given CID
     * @param {*} hash The IPFS CID has you want to get the JSON
     */
    getJSONfromHash: function(cid) {
      return new Promise((resolve, reject)=>{
        ipfs.cat("/ipfs/"+cid)
        .then((response)=>{
          resolve(JSON.parse(response.toString('utf8')))
        })
        .catch((err)=>{
          console.log(err)
          reject("Error in reading from ipfs")
        })
      })
    },
     /**
     * @returns The IPFS CID related to the uploaded JSON
     * @param {*} productJSON The JSON you want to save to IPFS
     */
    insertJSONintoIPFS: function(productJSON) {
      return new Promise((resolve, reject)=>{
        const content = IPFS.Buffer.from(JSON.stringify(productJSON))
        ipfs.add(content)
        .then((result)=>{
          resolve(result[0].hash)
        })
        .catch(()=>{
          reject('error writing to IPFS API')
        })
      })
    }
  }
  // OLD VERSION using ipfs-mini
  // return {
  //   /**
  //    * @returns The JSON object corresponding to the given CID
  //    * @param {*} hash The IPFS CID has you want to get the JSON
  //    */
  //   getJSONfromHash: function(hash) {
  //     return new Promise((resolve, reject)=>{
  //       ipfs.catJSON(hash)
  //       .then(resolve)
  //       .catch((err)=>{
  //         reject("It seems like IPFS API are not working in this moment :( Please try later.\n Error: "+err)
  //       })
  //     })

  //   },
  //   /**
  //    * @returns The IPFS CID related to the uploaded JSON
  //    * @param {*} productJSON The JSON you want to save to IPFS
  //    */
  //   insertJSONintoIPFS: function(productJSON) {
  //     return new Promise((resolve, reject)=>{
  //       ipfs.addJSON(productJSON)
  //       .then(resolve)
  //       .catch((err)=>{
  //         reject("It seems like IPFS API are not working in this moment :( Please try later.\n Error: "+err)
  //       })
  //     })

  //   }
  // }
}());

module.exports = ipfsModule;
