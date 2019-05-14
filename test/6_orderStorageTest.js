const { getWeb3 } = require('./helpers');
const ContractManager = artifacts.require("ContractManager");
const OrderStorage = artifacts.require("OrderStorage");


var web3 = getWeb3()


contract("OrderStorage", (accounts) => {
  var contractManagerInstance;
  var orderStorageInstance;


  before(() => {
    contractManagerInstance = new web3.eth.Contract(
      ContractManager.abi,
      ContractManager.networks[ContractManager.network_id].address
    );

    orderStorageInstance = new web3.eth.Contract(
      OrderStorage.abi,
      OrderStorage.networks[ContractManager.network_id].address
    );
  });

  it("should add a new order", () => {
    var key = "0x7465737400000000000000000000000000000000000000000000000000000000"
    var funH = 3
    var products = [
      "0x7415737400000000000000000000000000000000000000000000000000000000",
      "0x7465723740000000000000000000000000000000000000000000000000000000",
      "0x9999999999999999000000000000000000000000000000000000000000000000",
      "0x9999999999999999000000000000000000000000000000000000000000000000",
      "0x9999999999999999000000000000000000000000000000000000000000000000",
      "0x9999999999999999000000000000000000000000000000000000000000000000",
      "0x9999999999999999000000000000000000000000000000000000000000000000",
      "0x9999999999999999000000000000000000000000000000000000000000000000",
      "0x9999999999999999000000000000000000000000000000000000000000000000",
      "0x9999999999999999000000000000000000000000000000000000000000000000",
    ]

    return orderStorageInstance.methods.addOrder(key, funH, 2, accounts[1], accounts[2], products, 10020, 2522)
    .send({from: accounts[0], gas: 6000000})
    .then(() => {
      return orderStorageInstance.methods.getOrder(key).call()
      .then((result) => {
        assert.equal(result[0], 10020)
        assert.equal(result[1],2522)
        assert.equal(result[2], accounts[2])
        assert.equal(result[3],accounts[1])

        for(var i = 0; i < 10; ++i) {
          assert.equal(result[4][i], products[i], "Wrong pruduct returned")
        }
      })
      .then(() => {
        return orderStorageInstance.methods.getOrderCid(key).call()
        .then((result) => {
          assert.equal(result[0], key)
          assert.equal(result[1], funH)
          assert.equal(result[2], 2)
        })
      })
    })
  })
})
