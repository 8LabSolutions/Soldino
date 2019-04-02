const { getWeb3 } = require('./helpers')

const ContractManager = artifacts.require("ContractManager");
const BusinessStorage = artifacts.require("BusinessStorage");
const UserLogic = artifacts.require("UserLogic");
const UserStorage = artifacts.require("UserStorage");

var web3 = getWeb3()

contract ("BusinessStorage", (accounts) => {
  var contractManagerInstance;
  var businessStorageInstance;
  var userLogicInstance;
  var userStorageInstance;
  const BUSINESS = accounts[4];

  before(async () => {
    contractManagerInstance = new web3.eth.Contract(ContractManager.abi,
      ContractManager.networks[ContractManager.network_id].address);
    await contractManagerInstance.methods.getContractAddress("BusinessStorage").call()
    .then((_businessStorageAddress)=>{
      businessStorageInstance = new web3.eth.Contract(BusinessStorage.abi,
        _businessStorageAddress);
    })
     contractManagerInstance.methods.getContractAddress("UserLogic").call()
    .then((_userLogicAddress)=>{
      userLogicInstance = new web3.eth.Contract(UserLogic.abi,
        _userLogicAddress);
    })
    return contractManagerInstance.methods.getContractAddress("UserStorage").call()
    .then((res) => {
      userStorageInstance = new web3.eth.Contract(UserStorage.abi,
        res)
    })
  });
  
  it("should check if the data are correctly saved", () => {
    var name = "8LabSolutions";
    var VATNumber = "1234567890";
    var email = "8LabSolutions@gmail.com";
    var deliveryAddress = "Via Esempio, 8, Paese, 12345";
    return userLogicInstance.methods.addBusiness(name, VATNumber, email, deliveryAddress)
    .send({from: BUSINESS, gas:6000000})
    .then(function(){
      return businessStorageInstance.methods.getName(BUSINESS).call().then((ris) => {
        assert.equal(
          ris,
          name
       )
      })
    }).then(() => {
        return businessStorageInstance.methods.getVATNumber(BUSINESS).call().then((_vat)=>{
          assert.equal(
            _vat,
            VATNumber,
           "The VAT has not been setted correctly"
         )
      })
    }
    ).then(() => {
      return businessStorageInstance.methods.getEmail(BUSINESS).call().then((_email)=>{
        assert.equal(
          _email,
          email,
          "The email has not been setted correctly"
        )
      })
    })
    .then(() => {
      return businessStorageInstance.methods.getDeliveryAddress(BUSINESS).call().then((_deliveryAddress)=>{
        assert.equal(
          _deliveryAddress,
          deliveryAddress,
          "The email has not been setted correctly"
        )
      })
    })
    .then(() => {
      return userStorageInstance.methods.getUserType(accounts[4]).call()
      .then((res) => {
        console.log("Account 4: "+res)
        return assert.equal(res,2) 
      })
    })
  });
})

