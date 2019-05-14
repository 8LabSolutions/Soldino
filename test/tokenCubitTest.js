const { getWeb3 } = require('./helpers');

const TokenCubit = artifacts.require("TokenCubit");

var web3 = getWeb3();

contract("TokenCubit", (accounts) => {
  var tokenInstance;

  before(() => {
    tokenInstance = new web3.eth.Contract(
      TokenCubit.abi,
      TokenCubit.networks[TokenCubit.network_id].address
    );
  });

  it("should distribute token to multiple addresses", () =>{
    var addresses = [accounts[1], accounts[2], accounts[5], accounts[4]];
    return tokenInstance.methods.distributeToMultipleAddresses(addresses, 99).send({from: accounts[0], gas: 2000000})
    .then(async () => {
      for(let i = 0; i < addresses.length; i++) {
        await tokenInstance.methods.balanceOf(addresses[i]).call()
        .then((res) => {
          console.log(i)
          assert.equal(res, 99);
        })
      }
    })
  });
});
