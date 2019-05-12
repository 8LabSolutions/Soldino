const {getWeb3} = require('./helpers')

var UpgradeTest = artifacts.require("UpgradeTest")
var UpgradeTestCaller = artifacts.require("UpgradeTestCaller")
var UpgradeTestV2 = artifacts.require("UpgradeTestV2")

var ContractManager = artifacts.require("ContractManager")
var web3 = getWeb3();

contract("Upgrade", (accounts) => {
  var up;
  var contractManagerInstance;
  var caller;
  var up2;

  before(() => {
    contractManagerInstance = new web3.eth.Contract(
      ContractManager.abi,
      ContractManager.networks[ContractManager.network_id].address
    );
    up = new web3.eth.Contract(
      UpgradeTest.abi,
      UpgradeTest.networks[UpgradeTest.network_id].address
    );

    caller = new web3.eth.Contract(
      UpgradeTestCaller.abi,
      UpgradeTestCaller.networks[UpgradeTestCaller.network_id].address
    );

    up2 = new web3.eth.Contract(
      UpgradeTestV2.abi
    );


  });

  it("should call test function", () =>{
    return caller.methods.testFun().send({from: accounts[0], gas: 2000000})
    .then(() => {
      return caller.methods.store().call()
      .then((res) => {
        assert.equal(res, 1)
      })
    })
  });

  it("should upgrade the contract", () => {
    return up2.deploy({data: UpgradeTestV2.bytecode}).send({from: accounts[0], gas:2000000})
    .then(async (instace) => {
      await console.log(instace.options.address)
      return contractManagerInstance.methods.setContractAddress("UpgradeTest", instace.options.address)
      .send({from: accounts[0], gas:2000000})
      .then(() => {
        return caller.methods.testFun().send({from: accounts[0], gas: 2000000})
        .then(() => {
          return caller.methods.store().call()
          .then((res) => {
            assert.equal(res, 2)
          })
        })
      })
    })
  })
});
