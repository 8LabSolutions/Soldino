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

    productStorageInstance.methods.owner().call().then((result) => {console.log(result)})

  });

  it("should not give authorization to an unregistered address (ProductLogic)", () => {
    return productStorageInstance.methods.authorized(productLogicInstance.options.address)
    .call()
    .then((result) => {
      assert.equal(result, false);
    })
  })

  it("should set the ProductLogic contract as authorized contract", () => {
    return productStorageInstance.methods.addAuthorized(productLogicInstance.options.address)
    .send({from: accounts[0]})
    .then(() => {
      return productStorageInstance.methods.authorized(productLogicInstance.options.address)
      .call()
      .then((result) => {
        assert.equal(result, true);
      })
    })
  })

  it("should add a new product", async () => {
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
    .send({from: accounts[0], gas:6000000})
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
  })

  it("should set the NetPrice of a product", async () => {
    var key = "0x7465737400000000000000000000000000000000000000000000000000000000"
    var netPrice = 20
    return productStorageInstance.methods.setNetPrice(
      key,
      netPrice
    )
    .send({from: accounts[0], gas:6000000})
    .then(() => {

      return productStorageInstance.methods.getProduct(key).call()
      .then((result) => {
        assert.equal(result[0],key);
        assert.equal(result[4],netPrice);

      })
    })
  })
  
  it("should set the VAT percentage of a product", async () => {
    var key = "0x7465737400000000000000000000000000000000000000000000000000000000"
    var vat = 22
    
    return productStorageInstance.methods.setVatPercentage(
      key,
      vat
    )
    .send({from: accounts[0], gas:6000000})
    .then(() => {

      return productStorageInstance.methods.getProduct(key).call()
      .then((result) => {
        assert.equal(result[0],key);
        assert.equal(result[3],vat);

      })
    })
  })

  it("should set the Seller of a product", async () => {
    var key = "0x7465737400000000000000000000000000000000000000000000000000000000"
    var seller = accounts[2]
    return productStorageInstance.methods.setSeller(
      key,
      seller
    )
    .send({from: accounts[0], gas:6000000})
    .then(() => {

      return productStorageInstance.methods.getProduct(key).call()
      .then((result) => {
        assert.equal(result[0],key);
        assert.equal(result[5],seller);

      })
    })
  })
  
  it("should set the Hash Size of a product", async () => {
    var key = "0x7465737400000000000000000000000000000000000000000000000000000000"
    var size = 2
    return productStorageInstance.methods.setHashSize(
      key,
      size
    )
    .send({from: accounts[0], gas:6000000})
    .then(() => {

      return productStorageInstance.methods.getProduct(key).call()
      .then((result) => {
        assert.equal(result[0],key);
        assert.equal(result[1],size);

      })
    })
  }) 

  it("should set the Hash Function of a product", async () => {
    var key = "0x7465737400000000000000000000000000000000000000000000000000000000"
    var funH = 3
    return productStorageInstance.methods.setHashFunction(
      key,
      funH
    )
    .send({from: accounts[0], gas:6000000})
    .then(() => {

      return productStorageInstance.methods.getProduct(key).call()
      .then((result) => {
        assert.equal(result[0],key);
        assert.equal(result[2],funH);

      })
    })
  })

  it("should set the Latest Hash Ipfs of a product", async () => {
    var key = "0x7465737400000000000000000000000000000000000000000000000000000000"
    var lkey = "0x7475737400000000000000000000000000000000000000000000000000000000"
  
    return productStorageInstance.methods.setLatestHashIpfs(
      key,
      lkey
    )
    .send({from: accounts[0], gas:6000000})
    .then(() => {

      return productStorageInstance.methods.getProduct(key).call()
      .then((result) => {
        assert.equal(result[0],lkey);

      })
    })
  })
  
  it("should update Hash of a product", async () => {
    var key = "0x7475737400000000000000000000000000000000000000000000000000000000"
    var ipfsHash = "0x7473737400000000000000000000000000000000000000000000000000000000"
    var funH = 2;
    var hSize = 1
  
    return productStorageInstance.methods.updateHash(
      key,
      ipfsHash,
      funH,
      hSize
    )
    .send({from: accounts[0], gas:6000000})
    .then(() => {

      return productStorageInstance.methods.getProduct(key).call()
      .then((result) => {
        assert.equal(result[0],ipfsHash);
        assert.equal(result[1],hSize);
        assert.equal(result[2],funH);


      })
    })
  })
  
  it("should delete a product", async () => {
    var key = "0x7465737400000000000000000000000000000000000000000000000000000000"
    return productStorageInstance.methods.deleteProduct(
      key
    )
    .send({from: accounts[0], gas:6000000})
    .then(() => {

      return productStorageInstance.methods.getProduct(key).call()
      .then((result) => {
        assert.equal(result[0],"0x0000000000000000000000000000000000000000000000000000000000000000");
        assert.equal(result[1],0);
        assert.equal(result[2],0);
        assert.equal(result[3],0);
        assert.equal(result[4],0);
        assert.equal(result[5],0);
      })
    })
  })


})
