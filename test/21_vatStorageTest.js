const { getWeb3 } = require('./helpers');
const VatStorage = artifacts.require("VatStorage");



var web3 = getWeb3()

contract("VatLogic", (accounts) => {
  var vatStorageInstance;
  before(() => {
    vatStorageInstance = new web3.eth.Contract(
      VatStorage.abi,
      VatStorage.networks[VatStorage.network_id].address
    );
  });

  it("should insert a VAT input movement", () => {
    var key = "0x7465737400000000000000000000000000000000000000000000000000000000"
    return vatStorageInstance.methods.insertVatAndSetState(key,accounts[2],10000).send({from: accounts[0], gas: 200000})
    .then(() => {
       return  vatStorageInstance.methods.getVatState(key).call()
       .then((res) => {
         assert.equal(res, 0)
       })
    })
    .then(() => {
      return vatStorageInstance.methods.getVatAmount(key).call()
      .then((res) => {
        assert.equal(res,10000)
      })
    })
  });

  it("should insert  a VAT output movement", () => {
    var key = "0x7465717400000000000000000000000000000000000000000000000000000000"
    return vatStorageInstance.methods.insertVatAndSetState(key,accounts[2],-10000).send({from: accounts[0], gas: 200000})
    .then(() => {
      return  vatStorageInstance.methods.getVatState(key).call()
      .then((res) => {
        assert.equal(res, 3)
      })
   })
   .then(() => {
     return vatStorageInstance.methods.getVatAmount(key).call()
     .then((res) => {
       assert.equal(res,-10000)
     })
   })
  })
})
