//const IPFS = require('ipfs-mini');
const { getWeb3 } = require('./helpers')

const ContractManager = artifacts.require("ContractManager");
const CitizenStorage = artifacts.require("CitizenStorage");
const UserLogic = artifacts.require("UserLogic");

var web3 = getWeb3()


contract("CitizenStorage", (accounts) => {
  var contractManagerInstance;
  var citizenStorageInstance;
  const CITIZEN = accounts[3];
  const GOVERNMENT = accounts[9];
  var userLogicInstance;

  before(async () => {
    contractManagerInstance = new web3.eth.Contract(ContractManager.abi,
      ContractManager.networks[ContractManager.network_id].address);
    await contractManagerInstance.methods.getContractAddress("CitizenStorage").call()
    .then((_citizenStorageInstance)=>{
      citizenStorageInstance = new web3.eth.Contract(CitizenStorage.abi,
        _citizenStorageInstance);
    })
    return contractManagerInstance.methods.getContractAddress("UserLogic").call()
    .then((_userLogicAddress)=>{
      userLogicInstance = new web3.eth.Contract(UserLogic.abi,
        _userLogicAddress);
    })
  });

  it("should check if the data are correctly saved", () => {
    var name = "8Lab";
    var surname = "Solutions";
    var email = "8LabSolutions@gmail.com";
    var deliveryAddress = "Via Esempio, 8, Paese, 12345";
    return userLogicInstance.methods.addCitizen(name, surname, email, deliveryAddress)
    .send({from: CITIZEN, gas: 4712388}).then(function(){
      return citizenStorageInstance.methods.getName(CITIZEN).call().then((ris) => {
        assert.equal(
          ris,
          name
       )
      })
    }).then(() => {
        return citizenStorageInstance.methods.getSurname(CITIZEN).call().then((_surname)=>{
          assert.equal(
            _surname,
            surname,
           "The surname has not been setted correctly"
         )
      })
    }).then(()=>{
      return citizenStorageInstance.methods.getEmail(CITIZEN).call().then((_email)=>{
        assert.equal(
          _email,
          email,
          "The email has not been setted correctly"
        )
      })
    }).then(()=>{
      return citizenStorageInstance.methods.getDeliveryAddress(CITIZEN).call().then((_deliveryAddress)=>{
        assert.equal(
          _deliveryAddress,
          deliveryAddress,
          "The email has not been setted correctly"
        )
      })
    })
  });

  it("should check that the government can actually disable a citizen account", () => {
    return citizenStorageInstance.methods.getActive(CITIZEN).call().then((active) => {
      assert.equal(
        active,
        true,
        "The citizen is disabled"
      );
      return citizenStorageInstance.methods.setActive(CITIZEN, false).send({from: GOVERNMENT, gas: 4712388}).then(()=>{
        return citizenStorageInstance.methods.getActive(CITIZEN).call().then((active)=>{
          assert.equal(
            active,
            false,
            "Disabling went wrong"
          );
        });
      });
    });
  });
  /*
  it("should test IPFS", () =>{
    const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
    var ilMioJSON = {name:"Palla", costo:13.13};
    var hash;
    return ipfs.addJSON(ilMioJSON).then((ris)=>{
      hash= ris;
      return ipfs.catJSON(hash).then((_ris2)=>{
        var ris2 = _ris2;
        assert.equal(
          ilMioJSON.name,
          ris2.name,
          "avrebbero dovuto essere uguali"
        )
      })
    })
  });
  */

  it("should revert because the caller is not the government", () =>{
    return citizenStorageInstance.methods.setActive(CITIZEN, false).send({from: accounts[5], gas: 4712388})
    .catch(() => {
      assert.isTrue(true);
    })
  });

});
