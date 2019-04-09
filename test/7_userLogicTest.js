const truffleAssert = require('truffle-assertions');
const { getWeb3 } = require('./helpers')

const ContractManager = artifacts.require("ContractManager");
const UserStorage = artifacts.require("UserStorage");
const UserLogic = artifacts.require("UserLogic");

var web3 = getWeb3()

contract("UserLogic", (accounts) => {
    var contractManagerInstance;
    var userStorageInstance;
    var userLogicInstance;
    
    before(() => {
        contractManagerInstance = new web3.eth.Contract(
          ContractManager.abi,
          ContractManager.networks[ContractManager.network_id].address
        );
    
        userStorageInstance = new web3.eth.Contract(
          UserStorage.abi,
          UserStorage.networks[ContractManager.network_id].address
        );
    
        userLogicInstance = new web3.eth.Contract(
          UserLogic.abi,
          UserLogic.networks[ContractManager.network_id].address
        );
      });

      it("should check if user logic is added to the authorized contract of UserStorage", () => {
        return userStorageInstance.methods.authorized(userLogicInstance.options.address)
        .call()
        .then((result) => {
          if(result === false) {
            return userStorageInstance.methods.addAuthorized(userLogicInstance.options.address)
            .send({from: accounts[0]})
          }
          return
        })
        .then(() => {
          return userStorageInstance.methods.authorized(userLogicInstance.options.address)
          .call()
          .then((result) => {
            assert.equal(result, true)
          })
        })
      });

      it("Should add a new Citizen", () => {
        return userLogicInstance.methods.addCitizen(accounts[8],1,1)
        .send({from: accounts[8]})
        .then(() => {
            userLogicInstance.methods.isRegistered(accounts[8]).call().then((result) => {
            assert.equal(result, true)
          })
        })
      })

      it("Should add a new Business", () => {
        return userLogicInstance.methods.addBusiness(accounts[7],1,1)
        .send({from: accounts[7]})
        .then(() => {
            userLogicInstance.methods.getUserInfo(accounts[7]).call().then((result) => {
            assert.equal(result[0], accounts[7]);
            assert.equal(result[1], 1);
            assert.equal(result[2], 1);
          })
        })
      })

     /*it("----", () => {
        userLogicInstance.methods.login(accounts[8])
        .send({from: accounts[8]})
        .then((result) => {
            assert.equal(result, accounts[8])
          
    
        })
      })*/

      

})