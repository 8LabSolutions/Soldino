pragma solidity ^0.5.0;


import "./TokenCubit.sol";
import "./ContractManager.sol";
import "./logic/ProductLogic.sol";
import "./logic/OrderLogic.sol";

contract Escrow is tokenRecipient {
    ContractManager contractManager;

    TokenCubit cubitToken;
    OrderLogic orderLogic;
    bytes32[] products;
    uint8[] productsQtn;
    // accounts who have sent cubit to the contract
    mapping (address => uint256) public registrantsPaid;

    event OrderReceived(address _from, address _to, uint256 _ammount);

    constructor(address _token) public {
        cubitToken = TokenCubit(_token);
    }

    //override
    function receiveApproval(address _from, uint256 _value, address _token ) external {
        registrantsPaid[_from] += _value;
    }

    /*function confirmBuy(
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
        uint8 prevOrderHashFun = _orderHashFun[0];
        uint8 prevOrderHashSize = _orderHashSize[0];

        bytes32[] storage orderProd = products;
        orderProd.push(_prodHash[0]);

        uint8[] storage orderProdQtn = productsQtn;
        orderProdQtn.push(_prodQtn[0]);

        setOrderLogic();
        for(uint i = 1; i < _prodHash.length; ++i) {
            if(_orderHash[i] != prevOrderHash) {

                //insert the order
                orderLogic.registerOrder(
                    prevOrderHash,
                    prevOrderHashFun,
                    prevOrderHashSize,
                    msg.sender,
                    _period,
                    orderProd,
                    orderProdQtn
                );
                //Get the total of the order
                uint256 total = orderLogic.getOrderTotal(prevOrderHash);
                // pay the order
                setTokenCubit();
                require(cubitToken.transferFrom(msg.sender, orderLogic.getOrderSeller(prevOrderHash), total));
                //set the new orderHash
                prevOrderHash = _orderHash[i];
                prevOrderHashFun = _orderHashFun[i];
                prevOrderHashSize = _orderHashSize[i];

                orderProd.push(_prodHash[i]);


                orderProdQtn.push(_prodQtn[i]);
            } else {
                orderProd.push(_prodHash[i]);
                orderProdQtn.push(_prodQtn[i]);
            }
        }
    }*/

    function setOrderLogic() internal {
        orderLogic = OrderLogic(contractManager.getContractAddress("OrderLogic"));
    }

    function setTokenCubit() internal {
        cubitToken = TokenCubit(contractManager.getContractAddress("TokenCubit"));
    }
}
