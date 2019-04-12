pragma solidity 0.5.6;

import "../ContractManager.sol";
import "../storage/OrderStorage.sol";
import "../storage/ProductStorage.sol";
import "../storage/UserStorage.sol";
import "./VatLogic.sol";
import "./ProductLogic.sol";



contract OrderLogic {
    ContractManager contractManager;
    OrderStorage  orderStorage;

    VatLogic vatLogic;
    UserStorage userStorage;
    ProductStorage productStorage;
    ProductLogic productLogic;


    event PurchaseOrderInserted(address indexed _buyer, bytes32 indexed _keyHash);
    event SellOrderInserted(address indexed _seller, bytes32 indexed _hashIpfs);

    modifier onlyBuyerOrSeller(bytes32 _keyHash, address _user) {
        require(_user == orderStorage.getBuyer(_keyHash) || _user == orderStorage.getSeller(_keyHash),
            "Cannot access the specified order, you are not the buyer or seller"
        );
        _;
    }

    modifier onlyPurchaseContract {
        require(msg.sender == contractManager.getContractAddress("Purchase"), "No permission");
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
        bytes32[] calldata _productsHash,
        uint8[] calldata _productsQtn
    )
        external
        //onlyPurchaseContract
    {
        setProductStorage();
        address _seller = productStorage.getProductSeller(_productsHash[0]);

        require(_productsHash.length > 0, "OrderLogic: products not provided");
        require(_seller != address(0), "OrderLogic: invalid seller address");
        require(_buyer != address(0), "OrderLogic: invalid buyer address");
        require(_buyer != _seller, "OrderLogic: cannot buy from yourself");
        // calculate the netTotal and the VAT Total
        (uint256 total, uint256 vatTotal) = calculateOrderTotal(_productsHash, _productsQtn);

        //register the order
        orderStorage.addOrder(_hashIpfs, _hashFun, _hashSize, _buyer, _seller, _productsHash, total, vatTotal);
        // Create instance of Vat Logic
        setVatLogic();

        // if the buyer is a business, the vat movement needs to be registered
        // to do so a UserStorage instance is created and if and only if the buyer
        // is a business, the vat movement is registered
        setUserStorage();
        int moltiplier = -1;
        if(userStorage.getUserType(_buyer) == 2) {
            moltiplier = 1;
        }
        vatLogic.registerVat(_buyer, (int256(vatTotal)*(moltiplier)), _period);
        // Using these events it's possible to see the orders history, both purchase and sell
        //emit the event on the blockchain: the event shows the buyer and the hash of the order
        emit PurchaseOrderInserted(_buyer, _hashIpfs);
        //emit the event on the blockchain: the event shows the seller and the hash of the order
        emit SellOrderInserted(_seller, _hashIpfs);
    }

    function setProductStorage() internal {
       productStorage = ProductStorage(contractManager.getContractAddress("ProductStorage"));
    }

    function setVatLogic() internal  {
       vatLogic = VatLogic(contractManager.getContractAddress("VatLogic"));
    }

    function setProductLogic() internal {
        productLogic = ProductLogic(contractManager.getContractAddress("ProductLogic"));
    }

    function setUserStorage() internal {
       userStorage = UserStorage(contractManager.getContractAddress("UserStorage"));
    }

    function calculateOrderTotal(bytes32[] memory  _productsHash, uint8[] memory _prodQtn)
        public returns(uint256, uint256)
    {
        require(_productsHash.length > 0, "Empty array");
        uint256 total = 0;
        setProductStorage();
        setProductLogic();
        address seller = productStorage.getProductSeller(_productsHash[0]);
        uint256 vatTotal = 0;

        for(uint i = 0; i < _productsHash.length; ++i) {
            require(productStorage.getProductSeller(_productsHash[i]) == seller, "Invalid product, wrong seller");
            total += (productStorage.getProductNetPrice(_productsHash[i]) * (uint256(_prodQtn[i])));
            vatTotal += (productLogic.calculateProductVat(_productsHash[i]) * (uint256(_prodQtn[i])));
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
