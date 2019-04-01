pragma solidity ^0.5.0;
import "./Owned.sol";


contract ContractManager is Owned {

    mapping (string => address) nameToAddress;

    string[] public names;


    function getContractAddress(string memory _contractName) public view returns(address) {
        require(nameToAddress[_contractName] != address(0), "The contract does not exist");
        return nameToAddress[_contractName];
    }

    function setContractAddress(string memory _contractName, address _deploymentAddress) public onlyOwner {
       nameToAddress[_contractName] = _deploymentAddress;
       names.push(_contractName);
    }

    function getL() public view returns(uint) {
        return names.length;
    }
}
