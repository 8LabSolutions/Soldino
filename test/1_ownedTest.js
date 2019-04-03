const {getWeb3} = require('./helpers')

const Owned = artifacts.require("Owned");
var web3 = getWeb3();

contract("Owned", (accounts) => {
  var ownedInstace
  before(async () => {
    const ownedContract = new web3.eth.Contract(Owned.abi)

    return ownedContract.deploy({data: Owned.bytecode}).send({from: accounts[0], gas:5000000})
    .then((instance) => {
      ownedInstace = instance;
      return;
    })
  })

  it("Should transfer ownership", () => {
    return ownedInstace.methods.transferOwnership(accounts[1]).send({from: accounts[0]})
    .then(() => {
      ownedInstace.methods.owner().call().then((result) => {
        assert.equal(result, accounts[1])
      })

    })
  })
})
