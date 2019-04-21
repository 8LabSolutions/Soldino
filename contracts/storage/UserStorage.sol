pragma solidity 0.5.6;

import "../ContractManager.sol";
import "../Authorizable.sol";


contract UserStorage is Authorizable {
    struct User {
        bytes32 HashIPFS;
        uint8 hashSize;
        uint8 hashFunction;
        address userAddress;
        uint8 userType;
        bool active;
    }

    //the manager from which the contract will get the contracts addresses
    address internal contractManagerAddress;

    //mapping containing all the registered users
    mapping(address => User) internal addressToUser;

    //setting the contractManagerAddress
    constructor (address _contractManagerAddress) public {
        contractManagerAddress = _contractManagerAddress;
    }

    //get the userType given an address: 0 => not registred, 1=> citizen,
    // 2=> business, 3=> government
    function getUserType(address _userAddress) public view returns (uint8) {
        if (_userAddress == owner)
            return 3;
        return addressToUser[_userAddress].userType;
    }

    function addUser(
        address _userAddress,
        uint8 _userType,
        uint8 _hashFun,
        uint8 _hashSize,
        bytes32 _hashIpfs
    )
        public onlyAuthorized
    {
        addressToUser[_userAddress].HashIPFS = _hashIpfs;
        addressToUser[_userAddress].hashFunction = _hashFun;
        addressToUser[_userAddress].hashSize = _hashSize;
        addressToUser[_userAddress].userType = _userType;
        addressToUser[_userAddress].userAddress = _userAddress;
        addressToUser[_userAddress].active = true;

    }

    function getIpfsCid(address _userAddress) public view returns(bytes32, uint8, uint8) {
        return(
            addressToUser[_userAddress].HashIPFS,
            addressToUser[_userAddress].hashFunction,
            addressToUser[_userAddress].hashSize
        );
    }

    function getUserState(address _userAddress) public view returns(bool) {
        return (addressToUser[_userAddress].active);
    }

    function setEnable(address _userAddress, bool _value) public {
        addressToUser[_userAddress].active = _value;
    }


}
