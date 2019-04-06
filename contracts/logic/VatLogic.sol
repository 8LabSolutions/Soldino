pragma solidity 0.5.6;

import "../ContractManager.sol";
import "../storage/VatStorage.sol";

contract VatLogic {
    ContractManager contractManager;
    VatStorage vatStorage;

    event VatMovementRegistered(address indexed _business, uint8 indexed _date ,bytes32 _key);
    event VatPaid(address indexed _business, uint8 indexed _paymentDate, uint256 _paidAmount);
    event VatRefundRequest(address indexed _business, bytes32 indexed _key, uint256 indexed _amount);

    modifier onlyBusinessInvoker(address _business) {
        //require(_business == )
        _;
    }

    function createVatKey(address _business, string memory _period, bytes32 _orderHash) public pure returns(bytes32) {
        return keccak256(abi.encodePacked(_business,_orderHash, _period));
    }
}

