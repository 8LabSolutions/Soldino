pragma solidity ^0.5.0;


import "./Owned.sol";


/**
    * Created: 2019-03-29
    * @author Mattia
    * @title Authorizable contract
    * @dev This contract is used by the data storage contracts.
    * its purpose is improve the security of a storage contract.
    * In fact the setters methods of a storage contract are external
    * but they must be invoked only by the related logic contract (at its lasted version).
    * To resolve this issues this contract defines the modifier onlyAuthorized.
    */
contract Authorizable is Owned {
    mapping(address => bool) public authorized;

    modifier onlyAuthorized() {
        require(authorized[msg.sender] == true || owner == msg.sender, "Permission denied");
        _;
    }

    function addAuthorized(address _toAdd) onlyOwner public {
        require(_toAdd != address(0),"Authorizable: addAuthorization");
        authorized[_toAdd] = true;
    }

    function removeAuthorized(address _toRemove) onlyOwner public {
        require(_toRemove != address(0));
        require(_toRemove != msg.sender);
        authorized[_toRemove] = false;
    }
}
