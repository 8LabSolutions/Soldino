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
    var ipfsHash = ["0x1115737400000000000000000000000000000000000000000000000000000000",
                    "0x3315737400000000000000000000000000000000000000000000000000000000"]

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
            .send({from: accounts[0], gas: 2000000})
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
        return userLogicInstance.methods.addCitizen(ipfsHash[0],1,1)
        .send({from: accounts[8], gas: 2000000})
        .then(() => {
            userLogicInstance.methods.isRegistered(accounts[8]).call().then((result) => {
            assert.equal(result, true)
          })
        })
      })

      it("Should add a new Business", () => {
        return userLogicInstance.methods.addBusiness(ipfsHash[1],1,1)
        .send({from: accounts[7], gas: 2000000})
        .then(() => {
            userLogicInstance.methods.getUserInfo(accounts[7]).call().then((result) => {
            assert.equal(result[0], ipfsHash[1]);
            assert.equal(result[1], 1);
            assert.equal(result[2], 1);
            assert.equal(result[3], true);
            assert.equal(result[4], 2);
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
