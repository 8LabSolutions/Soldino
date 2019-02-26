var Migrations = artifacts.require("Migrations");
var Token = artifacts.require("TokenERC20");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Token, 10000 ,
	"Test",
	"TT",
	"0x82BFE24926b45a253427F9950CaC1e7f9194817b");
};
