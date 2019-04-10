const { getWeb3 } = require('./helpers')

const ContractManager = artifacts.require("ContractManager");
const ProductLogic = artifacts.require("ProductLogic");
const OrderLogic = artifacts.require("OrderLogic");
const UserLogic = artifacts.require("UserLogic");
const Purchase = artifacts.require("Purchase");
const TokenCubit = artifacts.require("TokenCubit");

//Per fare un'acquisto servono:
// 2 utenti di cui uno è un'aziend
// il buyer deve avere token
// devo avere dei prodotti
// devo avere l'hash dell'ordine
// devo settare l'allowance del contratto di purchase per il buyer
var web3 = getWeb3()

contract("Purchase", (accounts) => {
    var contractManagerInstance;
    var orderLogicInstance;
    var productLogicInstance;
    var userLogicInstance;
    var purchaseInstance;
    var tokenInstance;

    // Utilizzo instanze di contratti di cui è già stato fatto il deploy sulla
    // blockchain
    before(() => {
      contractManagerInstance = new web3.eth.Contract(
        ContractManager.abi,
        ContractManager.networks[ContractManager.network_id].address
      );

      orderLogicInstance = new web3.eth.Contract(
        orderLogicInstance.abi,
        orderLogicInstance.networks[ContractManager.network_id].address
      );

      productLogicInstance = new web3.eth.Contract(
        ProductLogic.abi,
        ProductLogic.networks[ContractManager.network_id].address
      );

      userLogicInstance = new web3.eth.Contract(
        UserLogic.abi,
        UserLogic.networks[ContractManager.network_id].address
      );

      purchaseInstance = new web3.eth.Contract(
        Purchase.abi,
        Purchase.networks[ContractManager.network_id].address
      );

      tokenInstance = new web3.eth.Contract(
        TokenCubit.abi,
        TokenCubit.networks[ContractManager.network_id].address
      );
    })

    it("should buy some products", () => {

    })
})
