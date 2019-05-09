//module to get an IPFS instance
const IPFS = require('ipfs-http-client');
//connection to IPFS
const ipfs = IPFS({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });


var ipfsModule = (function() {
  return {
    /**
     * @returns The JSON object corresponding to the given CID
     * @param {*} hash The IPFS CID has you want to get the JSON
     */
    getJSONfromHash: function(cid){
      return new Promise((resolve, reject)=>{
        ipfs.get(cid)
        .then((result)=>{
          console.log(result)
          resolve(JSON.parse(result[0].content.toString('utf-8')))
        })
        .catch(()=>{
          reject('error reading ' + cid + ' from IPFS API')
        })
      })
    },
     /**
     * @returns The IPFS CID related to the uploaded JSON
     * @param {*} productJSON The JSON you want to save to IPFS
     */
    insertJSONintoIPFS: function(productJSON) {
      return new Promise((resolve, reject)=>{
        console.log(JSON.stringify(productJSON))
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
