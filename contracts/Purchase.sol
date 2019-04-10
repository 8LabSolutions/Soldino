pragma solidity ^0.5.0;


import "./TokenCubit.sol";
import "./ContractManager.sol";
import "./logic/ProductLogic.sol";
import "./logic/OrderLogic.sol";

contract Purchase {
    ContractManager contractManager;
    TokenCubit cubitToken;
    OrderLogic orderLogic;
    // These array are used to save the products and their quantity for an order
    bytes32[] internal orderProd;
    uint8[] internal orderProdQtn;

    event OrderReceived(address _from, address _to, uint256 _ammount);

    constructor(address _contractManager) public {
        contractManager = ContractManager(_contractManager);
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

        setOrderLogic();
        for(uint i = 0; i < _prodHash.length; ++i) {
            if(_orderHash[i] != prevOrderHash) {
                //insert the order
                orderLogic.registerOrder(
                    prevOrderHash,
                    _orderHashFun[i-1],
                    _orderHashSize[i-1],
                    msg.sender,
                    _period,
                    orderProd,
                    orderProdQtn
                );

                // pay the order
                setTokenCubit();
                require(cubitToken.transferFrom(msg.sender, orderLogic.getOrderSeller(prevOrderHash), orderLogic.getOrderTotal(prevOrderHash)), "Error during transfer");
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
        }
    }

    function setOrderLogic() internal {
        orderLogic = OrderLogic(contractManager.getContractAddress("OrderLogic"));
    }

    function setTokenCubit() internal {
        cubitToken = TokenCubit(contractManager.getContractAddress("TokenCubit"));
    }
}
