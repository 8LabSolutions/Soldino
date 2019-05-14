const {getWeb3} = require('./helpers')

const Authorizable = artifacts.require("Authorizable");
var web3 = getWeb3();

contract("Authorizable", (accounts) => {
  var authorizableInstace
  before(async () => {
    const authContract = new web3.eth.Contract(Authorizable.abi)

    return authContract.deploy({data: Authorizable.bytecode}).send({from: accounts[0], gas:5000000})
    .then((instance) => {
      authorizableInstace = instance;
      return;
    })
  })

  it("Should add an authorized", () => {
    return authorizableInstace.methods.addAuthorized(accounts[1]).send({from: accounts[0]})
    .then(() => {
      authorizableInstace.methods.authorized(accounts[1]).call().then((result) => {
        assert.equal(result, true)
      })
    })
  })

  it("Should remove the previous authorized", () => {
    return authorizableInstace.methods.removeAuthorized(accounts[1]).send({from: accounts[0]})
    .then(() => {
      authorizableInstace.methods.authorized(accounts[1]).call().then((result) => {
        assert.equal(result, false)
      })
    })
  })

})
