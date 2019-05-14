/*** GENERIC CONTRACTS ***/
var ContractManager = artifacts.require("ContractManager")
var TokenCubit = artifacts.require("TokenCubit")
/***  STORAGE CONTRACTS ***/
var UserStorage = artifacts.require("UserStorage")
var ProductStorage = artifacts.require("ProductStorage");
var OrderStorage = artifacts.require("OrderStorage")
var VatStorage = artifacts.require("VatStorage")
/***  LOGIC CONTRACTS ***/
var UserLogic = artifacts.require("UserLogic")
var ProductLogic = artifacts.require("ProductLogic");
var OrderLogic = artifacts.require("OrderLogic")
var VatLogic = artifacts.require("VatLogic")

var Purchase = artifacts.require("Purchase")

module.exports = function(deployer, network, accounts) {
  var contractManagerInstance;
  var userStorageInstance;
  var OrderStorageInstance;
  var vatStorageInstance;
  var productStorageInstance;
  //Logic
  var userLogicInstance;
  var orderLocicInstance;
  var vatLogicInstance;
  var productLogicInstance;


  const GOVERNMENT = accounts[0];


  deployer.deploy(ContractManager)
  .then((instance) => {
    contractManagerInstance = instance

    return deployer.deploy(TokenCubit,9999999999, "Cubit", "CC", GOVERNMENT)
    .then((tokenInstance) => {
      return contractManagerInstance.setContractAddress("TokenCubit", tokenInstance.address)
    })
    .then(() => {
      deployer.deploy(Purchase, contractManagerInstance.address)
      .then((purchaseInstace) => {
        return contractManagerInstance.setContractAddress("Purchase", purchaseInstace.address)
      })
    })
    .then(() => {
      return  deployer.deploy(UserStorage, contractManagerInstance.address)
      .then((usInstance) => {
        userStorageInstance = usInstance
        return contractManagerInstance.setContractAddress("UserStorage", usInstance.address)
      })
    })
    .then(()=>{
      return userStorageInstance.addUser(GOVERNMENT, 3, 0, 0, "0x00000000000000000000000000000000");
    })
    .then(() => {
      return deployer.deploy(UserLogic, contractManagerInstance.address)
      .then((ulInstace) => {
        userLogicInstance = ulInstace
        return contractManagerInstance.setContractAddress("UserLogic", ulInstace.address)
      })
    })
    .then(() => {
      return userStorageInstance.addAuthorized(userLogicInstance.address);
    })
    .then(() => {
      return deployer.deploy(ProductStorage)
      .then((prodIns) => {
        productStorageInstance = prodIns
        return contractManagerInstance.setContractAddress("ProductStorage", prodIns.address)
      })
      .then(() => {
        return deployer.deploy(ProductLogic, contractManagerInstance.address)
        .then((plIns) => {
          productLogicInstance = plIns
          return productStorageInstance.addAuthorized(plIns.address)
        })
        .then(() => {
          return contractManagerInstance.setContractAddress("ProductLogic", productLogicInstance.address)
        })
      })
    })
    .then(() => {
      return deployer.deploy(VatStorage)
      .then((VatIns) => {
        vatStorageInstance = VatIns
        return contractManagerInstance.setContractAddress("VatStorage", VatIns.address)
      })
      .then(() => {
        return deployer.deploy(VatLogic, contractManagerInstance.address)
        .then((VatLins) => {
          vatLogicInstance = VatLins
          return vatStorageInstance.addAuthorized(vatLogicInstance.address)
        })
        .then(() => {
          return contractManagerInstance.setContractAddress("VatLogic", vatLogicInstance.address)
        })
      })
    })
    .then(() => {
      return deployer.deploy(OrderStorage)
      .then((OrderInstance) => {
        OrderStorageInstance = OrderInstance
        return contractManagerInstance.setContractAddress("OrderStorage", OrderInstance.address)
      })
      .then(() => {
        return deployer.deploy(OrderLogic,contractManagerInstance.address)
        .then((OrderLinstance) => {
          orderLocicInstance = OrderLinstance
          return OrderStorageInstance.addAuthorized(OrderLinstance.address)
        })
        .then(() => {
          return contractManagerInstance.setContractAddress("OrderLogic", orderLocicInstance.address)
        })
      })
    })
  })
}
