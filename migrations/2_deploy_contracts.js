var Token = artifacts.require("TokenERC20");

module.exports = function(deployer) {
  deployer.deploy(Token, 1000000 ,
	"Cubit",
	"CUB",
	"0xA5A91DE72568141687864507423604f9Ea25E823");
};
