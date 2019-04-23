pragma solidity ^0.5.0;

import "../ContractManager.sol";
import "../storage/UserStorage.sol";


contract UserLogic {
    ContractManager internal contractManager;
    UserStorage internal userStorage;

    event UserInserted(
        address _userAddress,
        uint8 indexed _userType
    );

    modifier onlyGovernment {
        require(msg.sender == userStorage.owner(), "UserLogic: Permission denied");
        _;
    }

    constructor(address _contractManagerAddress) public {
        contractManager = ContractManager(_contractManagerAddress);
        userStorage = UserStorage(contractManager.getContractAddress("UserStorage"));
    }

    function setUserState(address _userAddress, bool value) external onlyGovernment {
        userStorage.setEnable(_userAddress, value);
    }

    function addCitizen(bytes32 _hashIpfs, uint8 _hashSize, uint8 _hashFun) public {
        //add the new entry to userstorage
        require(isRegistered(msg.sender) == false, "User already registered");
        userStorage.addUser(msg.sender, 1, _hashFun, _hashSize, _hashIpfs);
        //emit the inserted event
        emit UserInserted(msg.sender, 1);
    }

    function addBusiness(bytes32 _hashIpfs, uint8 _hashSize, uint8 _hashFun) public {
        //add the new entry to userstorage
        require(isRegistered(msg.sender) == false, "User already registered");
        userStorage.addUser(msg.sender, 2, _hashFun, _hashSize, _hashIpfs);
        //emit the inserted event
        emit UserInserted(msg.sender, 2);
    }

    function isRegistered(address _userAddress) public view returns(bool) {
        return userStorage.getUserType(_userAddress) == 0 ? false : true;
    }

    function login(address _userAddress) public view returns (uint8) {
        require(isRegistered(_userAddress), "User must be registered");
        return userStorage.getUserType(_userAddress);
    }

    function getUserInfo(address _userAddress)
        public view
        returns (bytes32, uint8, uint8, bool, uint8)
    {
        require(isRegistered(_userAddress), "User must be registered");
        uint8 userType = userStorage.getUserType(_userAddress);
        require(userType == 1 || userType == 2 || userType == 3, "Something went wrong");
        (bytes32 a, uint8 b, uint8 c) = userStorage.getIpfsCid(_userAddress);
        return (a, b, c, userStorage.getUserState(_userAddress), userType);
    }
}
