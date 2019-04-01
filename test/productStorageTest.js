const IPFS = require('ipfs-mini');
const { getWeb3 } = require('./helpers')

const ContractManager = artifacts.require("ContractManager");
const ProductStorage = artifacts.require("ProductStorage");
const ProductLogic = artifacts.require("ProductLogic");

var web3 = getWeb3()


contract("ProductStorage", (accounts) => {
  var contractManagerInstance;
  var productStorageInstance;
  var productLogicInstance;

  before(() => {
    contractManagerInstance = new web3.eth.Contract(
      ContractManager.abi,
      ContractManager.networks[ContractManager.network_id].address
    );

    productStorageInstance = new web3.eth.Contract(
      ProductStorage.abi,
      ProductStorage.networks[ContractManager.network_id].address
    );

    productLogicInstance = new web3.eth.Contract(
      ProductLogic.abi,
      ProductLogic.networks[ContractManager.network_id].address
    );

  });

  it("should not give authorization to an unregistered address (ProductLogic)", async () => {
    return productStorageInstance.methods.authorized(productLogicInstance.options.address)
    .call()
    .then((result) => {
      assert.equal(result, false);
    })
  })

  it("should set the ProductLogic contract as authorized contract", async () => {
    return productStorageInstance.methods.addAuthorized(productLogicInstance.options.address)
    .send({from: accounts[9]})
    .then(() => {
      return productStorageInstance.methods.authorized(productLogicInstance.options.address)
      .call()
      .then((result) => {
        assert.equal(result, true);
      })
    })
  })

  /*it("should add a new product", async () => {
    var key = "0x7465737400000000000000000000000000000000000000000000000000000000"
    var size = 1
    var funH = 2
    var vat = 22
    var price = 100
    var seller = accounts[1]
    return productStorageInstance.methods.addProduct(
      key,
      size,
      funH,
      vat,
      price,
      seller
    )
    .send({from: accounts[9]})
    .then(() => {

      return productStorageInstance.methods.getProduct(key).call()
      .then((result) => {
        assert.equal(result[0],key);
        assert.equal(result[1],size);
        assert.equal(result[2],funH);
        assert.equal(result[3],vat);
        assert.equal(result[4],price);
        assert.equal(result[5],seller);
      })
    })
  })*/
})
