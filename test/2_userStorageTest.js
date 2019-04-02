const {getWeb3} = require('./helpers')

const ContractManager = artifacts.require("ContractManager");
const UserLogic = artifacts.require("storage/UserLogic");
const UserStorage = artifacts.require("storage/UserStorage");

var web3 = getWeb3()

contract("UserStorage", (accounts) => {

  var contractManagerInstance;
  var userLogicInstance;
  var userStorageInstance;
  const CITIZEN = accounts[3];
  //console.log(accounts[9]+'dentro user');
  before(async () => {
    contractManagerInstance = new web3.eth.Contract(ContractManager.abi,
      ContractManager.networks[ContractManager.network_id].address);
    await contractManagerInstance.methods.getContractAddress("UserLogic").call()
    .then((_userLogicInstance)=>{
      userLogicInstance = new web3.eth.Contract(UserLogic.abi,
        _userLogicInstance);
    })
    return contractManagerInstance.methods.getContractAddress("UserStorage").call()
    .then((_userStorageInstance)=>{
      userStorageInstance = new web3.eth.Contract(UserStorage.abi,
        _userStorageInstance);
    })


  });

  it("should check if user 9 (Goverment) is registered", function(){
    return userLogicInstance.methods.login(accounts[9]).call().then(function(type){
      assert.equal(
        type,
        3,
        "Government not found, the contracts are not correctly initialized"
      )
    })
  });

  it("should insert a new citizen and get check its type is correct", () => {
    return userLogicInstance.methods.addCitizen("a","b","c","d").send({from: CITIZEN, gas: 4712388}).then(function(){
      return userLogicInstance.methods.login(CITIZEN).call().then(function(type){
        assert.equal(
          type,
          1,
          "Citizen insert is not correct :("
        )
      })
    })
  });

  it("should check if an user is already registered", function(){
    return userStorageInstance.methods.addUser(accounts[0], 1)
    .send({from: accounts[0], gas: 4712388})
    .catch(() => {
      assert.isTrue(true);
    })
  });

  it("should check if the user type is correct", function(){
    return userStorageInstance.methods.getUserType(CITIZEN)
    .send({from:CITIZEN, gas: 2000000}).then(function(type){
      type,
      1,
      "The user is not a citizen"
    })
  })

});


