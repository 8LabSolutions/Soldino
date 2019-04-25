pragma solidity 0.5.6;

import "../ContractManager.sol";
import "../storage/OrderStorage.sol";
import "../storage/UserStorage.sol";
import "./VatLogic.sol";
import "./ProductLogic.sol";


contract OrderLogic {
    ContractManager internal contractManager;
    OrderStorage  internal orderStorage;

    VatLogic internal vatLogic;
    UserStorage internal userStorage;
    ProductLogic internal productLogic;

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
        vatLogic = VatLogic(contractManager.getContractAddress("VatLogic"));
        userStorage = UserStorage(contractManager.getContractAddress("UserStorage"));
        productLogic = ProductLogic(contractManager.getContractAddress("ProductLogic"));
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
        setVatLogic();

        address _seller = productLogic.getProductSeller(_productsHash[0]);

        require(_productsHash.length > 0, "OrderLogic: products not provided");
        require(_seller != address(0), "OrderLogic: invalid seller address");
        require(_buyer != address(0), "OrderLogic: invalid buyer address");
        require(_buyer != _seller, "OrderLogic: cannot buy from yourself");
        // calculate the netTotal and the VAT Total
        (uint256 total, uint256 vatTotal) = calculateOrderTotal(_productsHash, _productsQtn);

        //register the order
        orderStorage.addOrder(_hashIpfs, _hashFun, _hashSize, _buyer, _seller, _productsHash, total, vatTotal);
        // Create instance of Vat Logic

        // if the buyer is a business, the vat movement needs to be registered
        // to do so a UserStorage instance is created and if and only if the buyer
        // is a business, the vat movement is registered
        if (userStorage.getUserType(_buyer) == 2) {
            vatLogic.registerVat(_buyer, (int256(vatTotal)*(-1)), _period);
        }
        vatLogic.registerVat(_seller, (int256(vatTotal)), _period);

        // Using these events it's possible to see the orders history, both purchase and sell
        //emit the event on the blockchain: the event shows the buyer and the hash of the order
        emit PurchaseOrderInserted(_buyer, _hashIpfs);
        //emit the event on the blockchain: the event shows the seller and the hash of the order
        emit SellOrderInserted(_seller, _hashIpfs);
    }

    function getOrderSeller(bytes32 _keyHash) public view returns(address) {
        return orderStorage.getSeller(_keyHash);
    }

    function getOrderTotal(bytes32 _keyHash) public view returns(uint) {
        return (orderStorage.getOrderNetTotal(_keyHash) + orderStorage.getOrderVatTotal(_keyHash));
    }

    function calculateOrderTotal(bytes32[] memory  _productsHash, uint8[] memory _prodQtn)
        public view returns(uint256, uint256)
    {
        require(_productsHash.length > 0, "Empty array");
        uint256 total = 0;
        address seller = productLogic.getProductSeller(_productsHash[0]);

        uint256 vatTotal = 0;

        for (uint i = 0; i < _productsHash.length; ++i) {
            require(productLogic.getProductSeller(_productsHash[i]) == seller, "Invalid product, wrong seller");
            total += ((productLogic.getProductNetPrice(_productsHash[i])) * (_prodQtn[i]));
            vatTotal += ((productLogic.calculateProductVat(_productsHash[i])) * (_prodQtn[i]));
        }

        return(total, vatTotal);
    }

    function setVatLogic() internal  {
        vatLogic = VatLogic(contractManager.getContractAddress("VatLogic"));
    }

    function setProductLogic() internal {
        productLogic = ProductLogic(contractManager.getContractAddress("ProductLogic"));
    }



}
