pragma solidity ^0.5.0;
import "../ContractManager.sol";
import "../Authorizable.sol";

contract UserStorage is Authorizable{
    //the manager from which the contract will get the contracts addresses
    address contractManagerAddress;
    //mapping containing all the registered users
    mapping(address => uint8) userTypes;
    //setting the contractManagerAddress
    constructor (address _contractManagerAddress) public {
        contractManagerAddress = _contractManagerAddress;
    }
    //get the userType given an address: 0 => not registred, 1=> citizen,
    // 2=> business, 3=> government

    function getUserType(address _userAddress) public view returns (uint8) {
        return userTypes[_userAddress];
    }

    function addUser(address _userAddress, uint8 _userType) public onlyAuthorized{
        require(getUserType(_userAddress) == 0, "User already registered");
        userTypes[_userAddress] = _userType;
    }

}
