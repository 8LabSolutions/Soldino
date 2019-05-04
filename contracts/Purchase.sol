pragma solidity 0.5.6;


import "./TokenCubit.sol";
import "./ContractManager.sol";
import "./logic/OrderLogic.sol";


contract Purchase {
    ContractManager internal contractManager;
    TokenCubit internal cubitToken;
    OrderLogic internal orderLogic;
    // These array are used to save the products and their quantity for an order
    bytes32[] internal orderProd;
    uint8[] internal orderProdQtn;
    //mapping(address => uint256) internal payments;

    constructor(address _contractManager) public {
        contractManager = ContractManager(_contractManager);
        cubitToken = TokenCubit(contractManager.getContractAddress("TokenCubit"));
    }

    function saveAndPayOrder(
        bytes32[] calldata _prodHash,
        uint8[] calldata _prodQtn,
        bytes32[] calldata _orderHash,
        uint8[] calldata _orderHashFun,
        uint8[] calldata _orderHashSize,
        string calldata _period
    )
        external
    {
        require(_prodQtn.length == _prodHash.length, "Error during purchase, invalid quantity");
        require(_orderHash.length == _prodHash.length, "Error during purchase, invalid order IPFS hash");
        require(_orderHashFun.length == _prodHash.length, "Error during purchase, invalid ipfs hash function");
        require(_orderHashSize.length == _prodHash.length, "Error during purchase, invalid ipfs hash size");
        bytes32 prevOrderHash = _orderHash[0];
        /*orderProd.push(_prodHash[0]);
        orderProdQtn.push(_prodQtn[0]);*/

        for (uint i = 0; i < _prodHash.length; i++) {
            if (_orderHash[i] != prevOrderHash) {
                //insert the order and pay the seller
                _saveAndPayOrder(prevOrderHash, orderProdQtn, orderProd, _orderHashFun[i-1], _orderHashSize[i-1], msg.sender, _period);
                //set the new orderHash
                prevOrderHash = _orderHash[i];
                //empty the product array for the next order
                delete orderProd;
                //empty the products' quantity for the next order
                delete orderProdQtn;
            }
            // push the current product in the product array for the current order
            orderProd.push(_prodHash[i]);
            // push the current product's quantity in the quantity array for the current order
            orderProdQtn.push(_prodQtn[i]);
            if (i == (_prodHash.length - 1)) {
                _saveAndPayOrder(prevOrderHash, orderProdQtn, orderProd, _orderHashFun[i], _orderHashSize[i], msg.sender, _period);
            }
        }
        delete orderProd;
        delete orderProdQtn;
    }

    function _saveAndPayOrder(
        bytes32 _orderHash,
        uint8[] memory _prodQtn,
        bytes32[] memory _prodHash,
        uint8 _orderHashFun,
        uint8 _orderHashSize,
        address _buyer,
        string memory _period
        )
        internal {
            setOrderLogic();
            orderLogic.registerOrder(_orderHash, _orderHashFun, _orderHashSize, _buyer, _period, _prodHash, _prodQtn);
            // pay the order
            require(cubitToken.transferFrom(
                _buyer, orderLogic.getOrderSeller(_orderHash),
                orderLogic.getOrderTotal(_orderHash)),
                "Error during transfer");
    }

    function setOrderLogic() internal {
        orderLogic = OrderLogic(contractManager.getContractAddress("OrderLogic"));
    }
}
