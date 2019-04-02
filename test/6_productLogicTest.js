const truffleAssert = require('truffle-assertions');
const { getWeb3 } = require('./helpers')

const ContractManager = artifacts.require("ContractManager");
const ProductStorage = artifacts.require("ProductStorage");
const ProductLogic = artifacts.require("ProductLogic");

var web3 = getWeb3()

contract("ProductLogic", (accounts) => {
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
    
        productStorageInstance.methods.owner().call().then((result) => {console.log(result)})
    
      });

      it("should check if product logic is added to the authorized contract of ProductStorage", () => {
        return productStorageInstance.methods.authorized(productLogicInstance.options.address)
        .call()
        .then((result) => {
          if(result === false) {
            return productStorageInstance.methods.addAuthorized(productLogicInstance.options.address)
            .send({from: accounts[0]})
          }
          return
        })
        .then(() => {
          return productStorageInstance.methods.authorized(productLogicInstance.options.address)
          .call()
          .then((result) => {
            assert.equal(result, true)
          })
        })
      });

     /* it("should add a new product", () => {
        var key = "0x7465737410000000000000000000000000000000000000000000000000000000"
        var size = 2
        var funH = 3
        var vat = 22
        var price = 100

        return productLogicInstance.methods.addProduct(
          key,
          size,
          funH,
          vat,
          price
        ).send({from: accounts[4], gas:2000000})
        .then((result) => {
          return truffleAssert.eventEmitted(result, 'ProductInserted', (ev) => {
            return ev._keyHash == "0x7465737410000000000000000000000000000000000000000000000000000000"
            && ev._seller == accounts[4];
          })
        })

      })*/
})