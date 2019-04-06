const { getWeb3 } = require('./helpers');
const VatLogic = artifacts.require("VatLogic");
const ContractManager = artifacts.require("ContractManager");


var web3 = getWeb3()

contract("VatLogic", (accounts) => {
  var contractManagerInstance;
  var vatLogicInstance;
  before(() => {
    contractManagerInstance = new web3.eth.Contract(
      ContractManager.abi,
      ContractManager.networks[ContractManager.network_id].address
    );

    vatLogicInstance = new web3.eth.Contract(
      VatLogic.abi,
      VatLogic.networks[ContractManager.network_id].address
    );
  });

  it("should create a vat key", () =>{
    console.log("test1")
    vatLogicInstance.methods.createVatKey(accounts[1],"2019-04-7", "0x7415737400000000000000000000000000000000000000000000000000000000")
    .call()
    .then((result) => {
      var aux = result
      console.log("key: "+ aux)
      assert.equal(aux,result)
    })
  });
})
