var Accounts = artifacts.require("Accounts");
var Token = artifacts.require("TokenERC20")

module.exports = function(deployer) {
  deployer.deploy(Accounts);
  deployer.deploy(Token, 10000, "Cubit", "CC", "0xb3f592d1f38286BfAe11DA6B9bec132C8A8AAF02");
};
