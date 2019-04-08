pragma solidity 0.5.6;

import "../ContractManager.sol";
import "../storage/VatStorage.sol";
import "../TokenCubit.sol";

contract VatLogic is tokenRecipient {
    ContractManager contractManager;
    VatStorage vatStorage;

    event VatMovementRegistered(address indexed _business, bytes32 indexed _key, uint256 _date);
    event VatPaid(address indexed _business, bytes32 indexed _key, int256 _paidAmount);
    event VatRefundRequest(address indexed _business, bytes32 indexed _key, int256  _amount);


    function createVatKey(address _business, string memory _period) public pure returns(bytes32) {
        return keccak256(abi.encodePacked(_business, _period));
    }

    function registerVat(address _business, int256 _vatAmount, string calldata _period) external {
        require(msg.sender == contractManager.getContractAddress("OrderLogic"), "Permission denied, cannot call 'InsertVat'.");
        bytes32 key = createVatKey(_business, _period);
        vatStorage.insertVat(key, _business, _vatAmount);
    }

    function receiveApproval(address _from, uint256 _value, address _token, bytes calldata _extraData) external {
        TokenCubit cubitToken = TokenCubit(_token);
        //tranfer, in Cubit, the VAT owned to the Governement
        require(cubitToken.transferFrom(_from, address(this), _value), "Transfer funds: permission denied");
    }
}

