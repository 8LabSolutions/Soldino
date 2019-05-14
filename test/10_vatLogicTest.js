const { getWeb3 } = require('./helpers');
const truffleAssert = require('truffle-assertions');

const VatLogic = artifacts.require("VatLogic");
const ContractManager = artifacts.require("ContractManager");
const VatStorage = artifacts.require("VatStorage");
const TokenCubit = artifacts.require("TokenCubit");

var web3 = getWeb3()

contract("VatLogic", (accounts) => {
  var contractManagerInstance;
  var vatLogicInstance;
  var vatStorageInstance;
  var tokenCubitInstance;

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

    tokenCubitInstance = new web3.eth.Contract(
      TokenCubit.abi,
      TokenCubit.networks[ContractManager.network_id].address
    );
  });
  var aux;
  var aux1;
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
      aux1 = res;
    })
    .then(() => {
      return vatLogicInstance.methods.registerVat(accounts[1], -10000, "2019-04-8").send({from: accounts[1], gas:200000})
      .then(() => {
        return vatStorageInstance.methods.getVatAmount(aux1).call()
        .then((res) => {
          assert.equal(res, -10000)
        })
      })
    })
  })

  it("should pay vat input movement", () => {
    //Give cubits to the business
    return tokenCubitInstance.methods.mintToken(accounts[1], 2000000).send({from: accounts[0], gas: 2000000})
    .then(() => {
      return tokenCubitInstance.methods.approve(VatLogic.address,100000).send({from: accounts[1], gas:200000})
      .then(() => {
        return vatLogicInstance.methods.payVat(aux).send({from: accounts[1], gas:200000})
        .then(() => {
          return vatStorageInstance.methods.getVatState(aux).call()
          .then((res) => {
            assert.equal(res, 2)
          })
        })
      })
    })
  })

  it("should pay vat output movement", () => {
    //Give cubits to the business
    return tokenCubitInstance.methods.mintToken(accounts[0], 2000000).send({from: accounts[0], gas: 2000000})
    .then(() => {
      return tokenCubitInstance.methods.approve(VatLogic.address,100000).send({from: accounts[0], gas:200000})
      .then(() => {
        return vatLogicInstance.methods.refundVat(aux1).send({from: accounts[0]})
        .then(() => {
          return vatStorageInstance.methods.getVatState(aux1).call()
          .then((res) => {
            assert.equal(res, 4)
          })
        })
      })
    })
  })
})
