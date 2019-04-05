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
}

