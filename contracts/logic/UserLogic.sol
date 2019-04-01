pragma solidity ^0.5.0;

import "../ContractManager.sol";
import "../storage/CitizenStorage.sol";
import "../storage/BusinessStorage.sol";
import "../storage/UserStorage.sol";
import "../Government.sol";

contract UserLogic {
    ContractManager contractManager;
    CitizenStorage citizenStorage;
    UserStorage userStorage;
    BusinessStorage businessStorage;
    Government government;

    constructor(address _contractManagerAddress) public {
        contractManager = ContractManager(_contractManagerAddress);
        citizenStorage = CitizenStorage(contractManager.getContractAddress("CitizenStorage"));
        userStorage = UserStorage(contractManager.getContractAddress("UserStorage"));
        businessStorage = BusinessStorage(contractManager.getContractAddress("BusinessStorage"));
        government = Government(contractManager.getContractAddress("Government"));
    }

    function addCitizen(string memory _name, string memory _surname,
    string memory _email, string memory _deliveryAddress) public {
        //add the new entry to userstorage

        userStorage.addUser(msg.sender, 1);
        //set the CitizenStorage contract
        citizenStorage.pushToCitizenList(msg.sender);
        citizenStorage.setName(msg.sender, _name);
        citizenStorage.setSurname(msg.sender, _surname);
        citizenStorage.setEmail(msg.sender, _email);
        citizenStorage.setDeliveryAddress(msg.sender, _deliveryAddress);

    }

    function addBusiness(string memory _name, string memory _VATNumber,
    string memory _email, string memory _deliveryAddress) public {
        //add the new entry to userstorage
        userStorage.addUser(msg.sender, 2);
        //set the businessStorage contract
        businessStorage.pushToBusinessList(msg.sender);
        businessStorage.setName(msg.sender, _name);
        businessStorage.setVATNumber(msg.sender, _VATNumber);
        businessStorage.setEmail(msg.sender, _email);
        businessStorage.setDeliveryAddress(msg.sender, _deliveryAddress);

    }

    function isRegistered(address _userAddress) public view returns(bool) {
        return userStorage.getUserType(_userAddress) == 0 ? false : true;
    }

    function login(address _userAddress) public view returns (uint8) {
        require(isRegistered(_userAddress), "User must be registered");
        return userStorage.getUserType(_userAddress);
    }

    function getUserInfo(address _userAddress) public view
    returns (string memory){
        require(isRegistered(_userAddress), "User must be registered");
        //check if the user is a citizen
        if(userStorage.getUserType(_userAddress)==1)
            return citizenStorage.getCitizenDataJSON(_userAddress);
        //check if the user is a business
        else if(userStorage.getUserType(_userAddress)==2)
            return businessStorage.getBusinessDataJSON(_userAddress);
        //check if the user is the government
        else if(userStorage.getUserType(_userAddress)==3)
            return government.getGovernmentDataJSON();
        //if none of the previous, revert because it's an error
        else
            revert("Wrong userType");
    }

}
