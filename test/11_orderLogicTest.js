const { getWeb3 } = require('./helpers');
const truffleAssert = require('truffle-assertions');

const ContractManager = artifacts.require("ContractManager");
const OrderStorage = artifacts.require("OrderStorage");
const OrderLogic = artifacts.require("OrderLogic");
const ProductLogic = artifacts.require("ProductLogic");
const UserLogic = artifacts.require("UserLogic");
const VatStorage = artifacts.require("VatStorage");
const VatLogic = artifacts.require("VatLogic");

var web3 = getWeb3()


contract("OrderLogic", (accounts) => {
  var contractManagerInstance;
  var orderStorageInstance;
  var orderLogicInstance;
  var productLogicInstance;
  var userLogicInstance;
  var vatStorageInstance

  before(() => {
    contractManagerInstance = new web3.eth.Contract(
      ContractManager.abi,
      ContractManager.networks[ContractManager.network_id].address
    );

    orderStorageInstance = new web3.eth.Contract(
      OrderStorage.abi,
      OrderStorage.networks[ContractManager.network_id].address
    );

    orderLogicInstance = new web3.eth.Contract(
      OrderLogic.abi,
      OrderLogic.networks[ContractManager.network_id].address
    );

    productLogicInstance = new web3.eth.Contract(
      ProductLogic.abi,
      ProductLogic.networks[ContractManager.network_id].address
    );

    userLogicInstance = new web3.eth.Contract(
      UserLogic.abi,
      UserLogic.networks[ContractManager.network_id].address
    );

    vatStorageInstance = new web3.eth.Contract(
      VatStorage.abi,
      VatStorage.networks[ContractManager.network_id].address
    );
  });

  var hashIPFSUsr1 = "0x7465737400000000000000000000000000000000000000000000000000000000"
  var hashIPFSUSr2 = "0x9995737400000000000000000000000000000000000000000000000000000000"
  var key = "0x7465737500000000000000000000000000000000000000000000000000000000"
  var funH = 3
  var productsKey = [
    "0x1115737400000000000000000000000000000000000000000000000000000000",
    "0x2225737400000000000000000000000000000000000000000000000000000000",
    "0x3335737400000000000000000000000000000000000000000000000000000000",
    "0x4445737400000000000000000000000000000000000000000000000000000000"
  ]
  var productsQtn = [1,2,3,1]
  var productsNetPrice = [100000,198560,100000,100000]
  var productsVat = [22,10,4,10]
  var period = "2019-05-09"

    /*.then(() => {
      vatStorageInstance.addAuthorized(OrderLogic.address).send({from: accounts[0], gas:2000000})
      .then(() => {
        return orderStorageInstance.authorized(OrderLogic.address).call()
        .then((res) => {
          assert.equal(res,true)
        })
      })
    })*/


  it("should set authorizations", () => {
    return orderStorageInstance.methods.addAuthorized(OrderLogic.address).send({from: accounts[0], gas:2000000})
    .then(() => {
      return orderStorageInstance.methods.authorized(OrderLogic.address).call()
      .then((result) => {
        assert.equal(result, true)
      })
    })
    .then(() => {
      return vatStorageInstance.methods.addAuthorized(VatLogic.address).send({from: accounts[0], gas:2000000})
      .then(() => {
        return vatStorageInstance.methods.authorized(VatLogic.address).call()
        .then((res) => {
          assert.equal(res,true)
        })
      })
    })
  })

  it("should add a new order", () => {

    return userLogicInstance.methods.addBusiness(hashIPFSUsr1,1,1).send({from:accounts[8] , gas: 200000})
    .then(() => {
      //BUS2
      return userLogicInstance.methods.addBusiness(hashIPFSUSr2,2,32).send({from: accounts[9], gas:200000})
    })
    .then(async () => {
      for(var i = 0; i<4; i++) {
        await productLogicInstance.methods.addProduct(productsKey[i],1,32,productsVat[i],productsNetPrice[i]).send({from: accounts[9], gas:2000000})
      }
    })
    .then(() => {
      return orderLogicInstance.methods.registerOrder(
        key,
        1,
        1,
        accounts[0],
        period,
        productsKey,
        productsQtn
      ).send({from: accounts[0], gas: 4000000})
    })
  })

  it("should revert the order, buyer is the same of the seller", async () => {
    await truffleAssert.reverts(orderLogicInstance.methods.registerOrder(
      "0x7465737500000000000000000000000000000000000000000000000000000001",
      1,
      1,
      accounts[9],
      period,
      productsKey,
      productsQtn
    ).send({from: accounts[9], gas: 4000000}))
  })
})
