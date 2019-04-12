pragma solidity 0.5.6;

import "../ContractManager.sol";
import "../storage/VatStorage.sol";
import "../TokenCubit.sol";

contract VatLogic {
    ContractManager contractManager;
    VatStorage vatStorage;

    event VatRegistered(address indexed _business, bytes32 indexed _key);
    event VatPaid(address indexed _business, bytes32 indexed _key);
    event VatRefunded(address indexed _business, bytes32 indexed _key);

    modifier onlyGovernment {
        require(msg.sender == vatStorage.owner(), "VAT Logic: Permission denied");
        _;
    }

    constructor(address _contracManager) public {
        contractManager = ContractManager(_contracManager);
        vatStorage = VatStorage(contractManager.getContractAddress("VatStorage"));
    }

    function createVatKey(address _business, string memory _period) public pure returns(bytes32) {
        return keccak256(abi.encodePacked(_business, _period));
    }

    function registerVat(address _business, int256 _vatAmount, string calldata _period) external {
       // require(msg.sender == contractManager.getContractAddress("OrderLogic"), "Permission denied, cannot call 'InsertVat'.");
        vatStorage.insertVatAndSetState(createVatKey(_business, _period), _business, _vatAmount);
        emit VatRegistered(_business,createVatKey(_business, _period));
    }


    function payVat(address _from, bytes32 _key) external {
        // The VAT needs to be paid only from the business which has generated the VAT movement
        require(_from == vatStorage.getVatBusiness(_key), "VAT payment: invalid VAT key");
        // The VAT in order to be paid needs to have a DUE state or OVERDUE state
        require(vatStorage.getVatState(_key) == 0 || vatStorage.getVatState(_key) == 1,
            "VAT payment: this VAT isn't a debit VAT");

        int256 vatDue = vatStorage.getVatAmount(_key);
        TokenCubit cubitToken = TokenCubit(contractManager.getContractAddress("TokenCubit"));
        // Transfer funds from the business to the government
        require(cubitToken.transferFrom(vatStorage.getVatBusiness(_key), vatStorage.owner() ,uint256(vatDue)),
            "VAT payment: an error occured during the fund transfer to the government");

        // Set the state of the VAT to PAID
        vatStorage.setVatState(_key, 2);

        emit VatPaid(_from, _key);
    }

    function refundVat(bytes32 _key) external onlyGovernment {
        // The VAT movement needs to be in TO_BE_REFUNDED state in order to be refunded
        require(vatStorage.getVatState(_key) == 3, "VAT refund: no need to refund this VAT");

        TokenCubit cubitToken = TokenCubit(contractManager.getContractAddress("TokenCubit"));
        address _business = vatStorage.getVatBusiness(_key);
        uint256 _amount = uint256(vatStorage.getVatAmount(_key)*(-1));

        // Transfer funds from the business to the government
        require(cubitToken.transferFrom(vatStorage.owner(), _business, _amount),
            "VAT payment: an error occured during the transfer.");

        vatStorage.setVatState(_key, 4);

        emit VatRefunded(_business, _key);
    }
}

