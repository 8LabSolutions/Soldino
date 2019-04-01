pragma solidity ^0.5.0;
/**
* Created: 2019-03-13
* @author Mattia
* @title Owned contract
* @dev This contract defines the Owner user a.k.a. the government user
*/
contract Owned {
    address public owner;

    constructor() public{
        owner = msg.sender;
    }

    /*
    * The modifier onlyOwner is used to improve security
    * Only the owner can call functions which have in their definition
    * the onlyOwner modifier
    */
    modifier onlyOwner {
        require(msg.sender == owner, "Permission denied");
        _;
    }

    //Transfer the ownership
    function transferOwnership(address newOwner) onlyOwner public {
        owner = newOwner;
    }
}
