var Accounts = artifacts.require("Accounts");
var Token = artifacts.require("TokenERC20")

module.exports = function(deployer) {
  deployer.deploy(Accounts);
  deployer.deploy(Token, 10000, "Cubit", "CC", "0x403CF5004c982896B17BAf0e878960F383bC8F3e");
};
