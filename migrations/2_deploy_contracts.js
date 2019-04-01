/*** GENERIC CONTRACTS ***/
var ContractManager = artifacts.require("ContractManager")
var Government = artifacts.require("Government")
/***  STORAGE CONTRACTS ***/
var UserStorage = artifacts.require("UserStorage")
var CitizenStorage = artifacts.require("CitizenStorage");
var BusinessStorage = artifacts.require("BusinessStorage");
var ProductStorage = artifacts.require("ProductStorage");
/***  LOGIC CONTRACTS ***/
var UserLogic = artifacts.require("UserLogic")
var ProductLogic = artifacts.require("ProductLogic");


module.exports = function(deployer, network, accounts) {
  var contractManagerInstance;
  var userStorageInstance;
  var citizenStorageInstance;
  var businessStorageInstance;
  var userLogicInstance;
  const GOVERNMENT = accounts[9];

  deployer.deploy(ContractManager).then((instance) => {
    contractManagerInstance = instance
   return  deployer.deploy(UserStorage, instance.address)
    .then((usInstance) => {
      userStorageInstance = usInstance
      return instance.setContractAddress("UserStorage", usInstance.address)
    })
    .then(() => {
      return deployer.deploy(CitizenStorage, GOVERNMENT).then((csInstance) => {
        citizenStorageInstance = csInstance
        return instance.setContractAddress("CitizenStorage", csInstance.address)
      })
    })
    .then(() => {
      return deployer.deploy(BusinessStorage, GOVERNMENT).then((bsInstance) => {
        businessStorageInstance = bsInstance
        return instance.setContractAddress("BusinessStorage", bsInstance.address)
      })
    })
    .then(() => {
      return deployer.deploy(Government, GOVERNMENT).then((govInstace) => {
        //insert the government account into the user storage account
        return userStorageInstance.addUser(GOVERNMENT, 3).then(()=>{
          return instance.setContractAddress("Government", govInstace.address)
        })
      })
    })
    .then(() => {
      return deployer.deploy(UserLogic, instance.address).then((ulInstace) => {
        userLogicInstance = ulInstace
        return instance.setContractAddress("UserLogic", ulInstace.address)
      })
    })
    .then(async () => {
       userStorageInstance.addAuthorized(userLogicInstance.address);
       citizenStorageInstance.addAuthorized(userLogicInstance.address);
      return businessStorageInstance.addAuthorized(userLogicInstance.address);
    })
    .then(() => {
      return deployer.deploy(ProductStorage,GOVERNMENT)
      .then((ProductStorageInstance) => {
        return deployer.deploy(
          ProductLogic,
          contractManagerInstance.address,
          ProductStorageInstance.address
        )
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
