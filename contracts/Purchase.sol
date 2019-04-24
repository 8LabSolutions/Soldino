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

    event OrderReceived(address _from, address _to, uint256 _ammount);

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
        bytes32 prevOrderHash = _orderHash[0];
        orderProd.push(_prodHash[0]);
        orderProdQtn.push(_prodQtn[0]);

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
    }

    function _saveAndPayOrder(
        bytes32 _prodHash,
        uint8[] memory _prodQtn,
        bytes32[] memory _orderHash,
        uint8 _orderHashFun,
        uint8 _orderHashSize,
        address _buyer,
        string memory _period
        )
        internal {
            setOrderLogic();
            orderLogic.registerOrder(_prodHash, _orderHashFun, _orderHashSize, _buyer, _period, _orderHash, _prodQtn);
            // pay the order
            require(cubitToken.transferFrom(
                _buyer, orderLogic.getOrderSeller(_prodHash),
                orderLogic.getOrderTotal(_prodHash)),
                "Error during transfer");
    }

    function setOrderLogic() internal {
        orderLogic = OrderLogic(contractManager.getContractAddress("OrderLogic"));
    }

}
