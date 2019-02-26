var Token = artifacts.require("TokenERC20");

module.exports = function(deployer) {
  deployer.deploy(Token, 100000 ,
	"Test",
	"SS",
	"0x82BFE24926b45a253427F9950CaC1e7f9194817b");
};
