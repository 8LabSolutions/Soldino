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

      it("should add a new product", () => {
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
        .then(() => {
          
          /*return truffleAssert.eventEmitted(result, 'ProductInserted', (ev) => {
            return ev._keyHash == "0x7465737410000000000000000000000000000000000000000000000000000000"
            && ev._seller == accounts[4];
          })*/
          return productStorageInstance.methods.getProduct(key).call()
      .then((result) => {
        assert.equal(result[0],key);
        assert.equal(result[1],size);
        assert.equal(result[2],funH);
        assert.equal(result[3],vat);
        assert.equal(result[4],price);
        assert.equal(result[5],accounts[4]);
          })


        })

      });

      it("should modify a product", () => {
        var key = "0x7465737410000000000000000000000000000000000000000000000000000000"
        var ipfsHash = "0x7465737430000000000000000000000000000000000000000000000000000000"
        var size = 2
        var funH = 3
        var vat = 21
        var price = 110

        return productLogicInstance.methods.modifyProduct(
          key,
          ipfsHash,
          size,
          funH,
          vat,
          price
        ).send({from: accounts[4], gas:2000000})
        .then(() => {
          
          /*return truffleAssert.eventEmitted(result, 'ProductInserted', (ev) => {
            return ev._keyHash == "0x7465737410000000000000000000000000000000000000000000000000000000"
            && ev._seller == accounts[4];
          })*/
          return productStorageInstance.methods.getProduct(key).call()
      .then((result) => {
        assert.equal(result[0],ipfsHash);
        assert.equal(result[1],size);
        assert.equal(result[2],funH);
        assert.equal(result[3],vat);
        assert.equal(result[4],price);
        assert.equal(result[5],accounts[4]);
          })


        })

      });

      it("should delete a product", () => {
        var key = "0x7465737410000000000000000000000000000000000000000000000000000000"

        return productLogicInstance.methods.deleteProduct(
          key,
          
        ).send({from: accounts[4], gas:2000000})
        .then(() => {
          
          /*return truffleAssert.eventEmitted(result, 'ProductInserted', (ev) => {
            return ev._keyHash == "0x7465737410000000000000000000000000000000000000000000000000000000"
            && ev._seller == accounts[4];
          })*/
          return productStorageInstance.methods.getProduct(key).call()
      .then((result) => {
        assert.equal(result[0],0x0000000000000000000000000000000000000000000000000000000000000000);
        assert.equal(result[1],0);
        assert.equal(result[2],0);
        assert.equal(result[3],0);
        assert.equal(result[4],0);
        assert.equal(result[5],0x0000000000000000000000000000000000000000000000000000000000000000);
          })


        })

      });


})