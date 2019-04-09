pragma solidity 0.5.6;

import "../ContractManager.sol";
import "../storage/OrderStorage.sol";
import "../storage/ProductStorage.sol";
import "../storage/UserStorage.sol";
import "./VatLogic.sol";



contract OrderLogic {
    ContractManager contractManager;
    OrderStorage  orderStorage;
    VatLogic vatLogic;
    UserStorage userStorage;
    ProductStorage productStorage;


    event OrderInserted(address indexed _buyer, address indexed _seller, bytes32 indexed _keyHash);

    modifier onlyBuyerOrSeller(bytes32 _keyHash, address _user) {
        require(_user == orderStorage.getBuyer(_keyHash) || _user == orderStorage.getSeller(_keyHash),
            "Cannot access the specified order, you are not the buyer or seller"
        );
        _;
    }

    modifier onlyPurchaseContract {
        require(msg.sender == contractManager.getContractAddress("Purchase"));
        _;
    }

    modifier onlyValidIpfsCid(bytes32 _hashIpfs, uint8 _hashFun, uint8 _hashSize) {
        require(_hashIpfs[0] != 0 && _hashFun > 0 && _hashSize > 0, "Invalid Ipfs key");
        _;
    }

    constructor(address _contractManagerAddress) public {
        contractManager = ContractManager(_contractManagerAddress);
        orderStorage = OrderStorage(contractManager.getContractAddress("OrderStorage"));
    }

    function registerOrder(
        bytes32 _hashIpfs,
        uint8 _hashFun,
        uint8 _hashSize,
        address _buyer,
        string calldata _period,
        bytes32[] calldata _productsHash
        //uint8[] calldata _productsQtn
    )
        external
        onlyPurchaseContract
        onlyValidIpfsCid(_hashIpfs, _hashFun, _hashSize)
    {
        setProductStorage();
        address _seller = productStorage.getProductSeller(_productsHash[0]);

        require(_productsHash.length > 0, "OrderLogic: products not provided");
        require(_seller != address(0), "OrderLogic: invalid seller address");
        require(_buyer != address(0), "OrderLogic: invalid buyer address");
        require(_buyer != _seller, "OrderLogic: cannot buy from yourself");

        (uint256 total, uint256 vatTotal) = calculateOrderTotal(_productsHash);

        orderStorage.addOrder(_hashIpfs,_hashFun, _hashSize, _buyer, _seller, _productsHash, total, vatTotal);

        // Create instance of Vat Logic
        // and register the vat Movement
        setVatLogic();
        vatLogic.registerVat(_seller, int256(vatTotal), _period);

        // if the buyer is a business, the vat movement needs to be registered
        // to do so a UserStorage instance is created and if and only if the buyer
        // is a business, the vat movement is registered
        setUserStorage();
        if(userStorage.getUserType(_buyer) == 2) {
            vatLogic.registerVat(_buyer, (int256(vatTotal)*(-1)), _period);
        }

        emit OrderInserted(_buyer, _seller, _hashIpfs);
    }

    function setProductStorage() internal {
       productStorage = ProductStorage(contractManager.getContractAddress("ProductStorage"));
    }

    function setVatLogic() internal  {
       vatLogic = VatLogic(contractManager.getContractAddress("VatLogic"));
    }

    function setUserStorage() internal {
       userStorage = UserStorage(contractManager.getContractAddress("UserStorage"));
    }

    function calculateOrderTotal(bytes32[] memory  _productsHash) internal view  returns(uint256, uint256) {
        uint256 total;
        address seller = productStorage.getProductSeller(_productsHash[0]);
        uint256 vatTotal;

        for(uint i = 0; i < _productsHash.length; ++i) {
            require(productStorage.getProductSeller(_productsHash[i]) == seller, "Invalid product, wrong seller");
            total += productStorage.getProductNetPrice(_productsHash[i]);
            vatTotal += productStorage.getProductVat(_productsHash[i]);
        }

        return(total, vatTotal);
    }

    function getOrderTotal(bytes32 _orderHash) external view returns(uint256) {
        return (orderStorage.getOrderNetTotal(_orderHash) + orderStorage.getOrderVatTotal(_orderHash));
    }

    function getOrderSeller(bytes32 _orderHash) external view returns(address) {
        return orderStorage.getSeller(_orderHash);
    }
}
