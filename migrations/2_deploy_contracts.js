var Adoption = artifacts.require("Adoption");
var Account = artifacts.require("Accounts");


module.exports = function(deployer) {
  deployer.deploy(Adoption);
  deployer.deploy(Account);
};
