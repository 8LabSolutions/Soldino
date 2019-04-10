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


  const GOVERNMENT = accounts[9];

  deployer.deploy(ContractManager).then((instance) => {
    contractManagerInstance = instance
   return  deployer.deploy(UserStorage, contractManagerInstance.address)
    .then((usInstance) => {
      userStorageInstance = usInstance
      return contractManagerInstance.setContractAddress("UserStorage", usInstance.address)
    })
    .then(() => {
      return deployer.deploy(UserLogic, contractManagerInstance.address)
      .then((ulInstace) => {
        userLogicInstance = ulInstace
        return contractManagerInstance.setContractAddress("UserLogic", ulInstace.address)
      })
    })
    .then(async () => {
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
      return deployer.deploy(OrderStorage)
      .then((OrderInstance) => {
        OrderStorageInstance = OrderInstance
        return contractManagerInstance.setContractAddress("OrderStorage", OrderInstance.address)
      })
      .then(() => {
        return deployer.deploy(OrderLogic,contractManagerInstance.address)
        .then((OrderLinstance) => {
          orderLocicInstance = OrderLinstance
          return OrderStorageInstance.addAuthorized(instance.address)
        })
        .then(() => {
          return contractManagerInstance.setContractAddress("OrderLogic", orderLocicInstance.address)
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
      return deployer.deploy(Purchase, contractManagerInstance.address)
      .then((purchaseInstace) => {
        return contractManagerInstance.setContractAddress("Purchase", purchaseInstace.address)
      })
    })
    .then(() => {
      return deployer.deploy(TokenCubit,9999999999, "Cubit", "CC", accounts[0])
      .then((tokenInstance) => {
        return contractManagerInstance.setContractAddress("TokenCubit", tokenInstance.address)
      })
    })
  })
}
  //every contract must be costructed with the constractManager address as a parameter
  //so it is instantiated before all others
  /*deployer.deploy(ContractManager).then(async (_contractManagerInstance) => {
    contractManagerInstance = _contractManagerInstance;
    //the userStorage contract is istantiated
    await deployer.deploy(UserStorage, contractManagerInstance.address)
    .then(async function(_userStorageInstance){
      userStorageInstance = _userStorageInstance;
      await contractManagerInstance.methods.getContractAddress("UserStorage").call()
      .then(async (address) => {
        console.log(address);
        await userStorageInstance.methods.addUser(accounts[9], 3).send();
      });
      //the government user is added to the contract during the deployment, since it is
      //also the general administrator

    })
    .then(async () => {
      await deployer.deploy(CitizenStorage, accounts[9])
      .then(async function(_citizenStorageInstance){
        citizenStorageInstance = _citizenStorageInstance;
        await contractManagerInstance.methods.setContractAddress("CitizenStorage", citizenStorageInstance.address)
        .send();
      })
    })
    .then(async () => {
      await deployer.deploy(BusinessStorage, accounts[9])
      .then(async function(_businessStorageInstance) {
        businessStorageInstance = _businessStorageInstance;
        await contractManagerInstance.methods.setContractAddress("BusinessStorage", businessStorageInstance.address)
        .send();
      })
    })
    .then(async () => {
      await deployer.deploy(Government, accounts[9])
      .then(async function(_governmentInstance){
        governmentInstance = _governmentInstance;
        await contractManagerInstance.methods.setContractAddress("Government", governmentInstance.address)
        .send();
      })
    })
    .then(() => {
      return deployer.deploy(UserLogic, contractManagerInstance.address)
      .then(async function(_userLogicInstance){
        userLogicInstance = _userLogicInstance;
        await contractManagerInstance.methods.setContractAddress("UserLogic", userLogicInstance.address)
        .send();
      });
    })
      //the citizenStorage contract is istantiated

      //the businessStorage contract is istantiated

  }*/
    //the government account
    //the userLogic refers to business/logic/user storages, so must be initialized after thes

    /*** DEPENDENCIES SET-UP (AUTHORIZATION)***/
    // UserLogic must can access UserStorage, CitizenStorage and BusinessStorage
