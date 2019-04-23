const { getWeb3 } = require('./helpers')

const ContractManager = artifacts.require("ContractManager");
const ProductLogic = artifacts.require("ProductLogic");
const OrderLogic = artifacts.require("OrderLogic");
const UserLogic = artifacts.require("UserLogic");
const Purchase = artifacts.require("Purchase");
const TokenCubit = artifacts.require("TokenCubit");
const VatStorage = artifacts.require("VatStorage");
const VatLogic = artifacts.require("VatLogic");
const OrderStorage = artifacts.require("OrderStorage");


//Per fare un'acquisto servono:
// 2 utenti di cui uno è un'aziend
// il buyer deve avere token
// devo avere dei prodotti
// devo avere l'hash dell'ordine
// devo settare l'allowance del contratto di purchase per il buyer
var web3 = getWeb3()

contract("Purchase", (accounts) => {
  var contractManagerInstance;
  var orderLogicInstance;
  var productLogicInstance;
  var userLogicInstance;
  var purchaseInstance;
  var tokenInstance;
  var vatStorageInstance;
  var orderLogicInstance;
  var orderStorageInstance;

  // Utilizzo instanze di contratti di cui è già stato fatto il deploy sulla
  // blockchain
  before(() => {
    contractManagerInstance = new web3.eth.Contract(
      ContractManager.abi,
      ContractManager.networks[ContractManager.network_id].address
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

    purchaseInstance = new web3.eth.Contract(
      Purchase.abi,
      Purchase.networks[ContractManager.network_id].address
    );

    tokenInstance = new web3.eth.Contract(
      TokenCubit.abi,
      TokenCubit.networks[ContractManager.network_id].address
    );

    vatStorageInstance = new web3.eth.Contract(
      VatStorage.abi,
      VatStorage.networks[ContractManager.network_id].address
    );

    orderStorageInstance = new web3.eth.Contract(
      OrderStorage.abi,
      OrderStorage.networks[ContractManager.network_id].address
    );

  })

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

  it("should buy some products", () => {
    var hashIPFSUsr1 = "0x7465737400000000000000000000000000000000000000000000000000000000"
    var hashIPFSUSr2 = "0x9995737400000000000000000000000000000000000000000000000000000000"

    var productsKey = [
      "0x1115737400000000000000000000000000000000000000000000000000000000",
      "0x2225737400000000000000000000000000000000000000000000000000000000",
      "0x3335737400000000000000000000000000000000000000000000000000000000",
      "0x4445737400000000000000000000000000000000000000000000000000000000",
      "0x5555737400000000000000000000000000000000000000000000000000000000",
      "0x6665737400000000000000000000000000000000000000000000000000000000",
      "0x7775737400000000000000000000000000000000000000000000000000000000",
    ]

    var productsNetPrice = [10000,10000,10000,10000,10000,10000,10000]
    var productsVat = [22,10,4,10,22,10,10]

    var ordersHash = [
      "0x1111111100000000000000000000000000000000000000000000000000000000",
      "0x1111111100000000000000000000000000000000000000000000000000000000",
      "0x1111111100000000000000000000000000000000000000000000000000000000",
      "0x1111111100000000000000000000000000000000000000000000000000000000",
      "0x5555555500000000000000000000000000000000000000000000000000000000",
      "0x5555555500000000000000000000000000000000000000000000000000000000",
      "0x5555555500000000000000000000000000000000000000000000000000000000",
    ]

    var productsQtn = [1,2,3,1,2,2,1]
    var ordersFun = [1,1,1,1,1,1,1]
    var ordersSize = [32,32,32,32,32,32,32]

    var period = "2019-04-01"

    //Create 3 businesses
    //BUS1
    return userLogicInstance.methods.addBusiness(hashIPFSUsr1,1,1).send({from:accounts[8] , gas: 200000})
    .then(() => {
      //BUS2
      return userLogicInstance.methods.addBusiness(hashIPFSUSr2,2,32).send({from: accounts[9], gas:200000})
    })
    .then(() => {
      //BUS3
      return userLogicInstance.methods.addBusiness(hashIPFSUSr2,2,32).send({from: accounts[7], gas:200000})
    })
    .then(async () => {
      // BUS2, BUS3 add products
      for(var i = 0; i<4; i++) {
        await productLogicInstance.methods.addProduct(productsKey[i],1,32,productsVat[i],productsNetPrice[i]).send({from: accounts[9], gas:2000000})
      }
      for(var j =4; j<7; j++) {
        await productLogicInstance.methods.addProduct(productsKey[j],1,32,productsVat[j],productsNetPrice[j]).send({from: accounts[7], gas:2000000})
      }
    })
    .then(() => {
      return tokenInstance.methods.transfer(accounts[8], 2000000).send({from: accounts[0], gas: 2000000})
    })
    .then(() => {
      return tokenInstance.methods.approve(Purchase.address, 2000000).send({from: accounts[8], gas: 2000000})
    })
    .then(() => {
      return purchaseInstance.methods.saveAndPayOrder(
        productsKey,
        productsQtn,
        ordersHash,
        ordersFun,
        ordersSize,
        period
      ).send({from: accounts[8], gas: 6000000})
    })
  })
})
