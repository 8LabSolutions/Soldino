const { getWeb3 } = require('./helpers');
const VatLogic = artifacts.require("VatLogic");
const ContractManager = artifacts.require("ContractManager");
const VatStorage = artifacts.require("VatStorage");

var web3 = getWeb3()

contract("VatLogic", (accounts) => {
  var contractManagerInstance;
  var vatLogicInstance;
  var vatStorageInstance;
  before(() => {
    contractManagerInstance = new web3.eth.Contract(
      ContractManager.abi,
      ContractManager.networks[ContractManager.network_id].address
    );
    vatStorageInstance = new web3.eth.Contract(
      VatStorage.abi,
      VatStorage.networks[VatStorage.network_id].address
    );

    vatLogicInstance = new web3.eth.Contract(
      VatLogic.abi,
      VatLogic.networks[ContractManager.network_id].address
    );
  });
  var aux;
  it("should create a vat key", () => {
    console.log("test1")
    return vatLogicInstance.methods.createVatKey(accounts[1],"2019-04-7")
    .call()
    .then((result) => {
      aux = result
      assert.equal(aux,result)
    })
  });

  it("should register Vat input movement", () => {
    return vatLogicInstance.methods.registerVat(accounts[1], 10000, "2019-04-7").send({from: accounts[1], gas:200000})
    .then(() => {
      return vatStorageInstance.methods.getVatAmount(aux).call()
      .then((res) => {
        assert.equal(res, 10000)
      })
    })
  })

  it("should register Vat output movement", () => {
    return vatLogicInstance.methods.createVatKey(accounts[1],"2019-04-8").call()
    .then((res) => {
      aux = res;
    })
    .then(() => {
      return vatLogicInstance.methods.registerVat(accounts[1], -10000, "2019-04-8").send({from: accounts[1], gas:200000})
      .then(() => {
        return vatStorageInstance.methods.getVatAmount(aux).call()
        .then((res) => {
          assert.equal(res, -10000)
        })
      })
    })
  })
})
