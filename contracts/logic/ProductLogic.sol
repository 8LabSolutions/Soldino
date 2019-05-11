pragma solidity ^0.5.0;

import "../storage/ProductStorage.sol";
import "../ContractManager.sol";
import "../storage/UserStorage.sol";


contract ProductLogic {
    ProductStorage internal productStorage;
    ContractManager internal contractManager;

    event ProductInserted(bytes32 indexed _keyHash, address indexed _seller, uint256 _netPrice, uint8 _vat, uint256 _totalPrice);

    event ProductModified(
        bytes32 indexed _keyHash,
        address indexed _seller,
        bytes32 indexed _newHashIPFS
    );

    event ProductDeleted(bytes32 indexed _keyHash, address indexed _seller);

    modifier onlyBusiness {
        UserStorage us = UserStorage(contractManager.getContractAddress("UserStorage"));
        require(us.getUserType(msg.sender) == 2, "You're not a business");
        _;
    }

    modifier onlyProductOwner(bytes32 _keyHash) {
        require(msg.sender == productStorage.getProductSeller(_keyHash),
            "This product doesn't belong to you");
        _;
    }

    modifier onlyValidKeyHash (bytes32 _keyHash) {
        // check if the given hash key is null
        require(_keyHash[0] != 0, "The given hash key is null");
        _;
    }

    modifier onlyValidIpfsCid(bytes32 _hashIpfs, uint8 _hashFun, uint8 _hashSize) {
        require(_hashIpfs[0] != 0 && _hashFun > 0 && _hashSize > 0, "Invalid Ipfs key");
        _;
    }

    constructor(address _contractManager) public {
        contractManager = ContractManager(_contractManager);
        productStorage = ProductStorage(contractManager.getContractAddress("ProductStorage"));
    }

    function getProductCid(bytes32 _keyHash) external view returns(bytes32, uint8, uint8) {
        return(
            productStorage.getLatestHash(_keyHash),
            productStorage.getHashFunction(_keyHash),
            productStorage.getHashSize(_keyHash)
        );
    }

    function getProductSeller(bytes32 _keyHash) external view returns(address) {
        return productStorage.getProductSeller(_keyHash);
    }

    function getProductNetPrice(bytes32 _keyHash) external view returns(uint256) {
        return productStorage.getProductNetPrice(_keyHash);
    }

    function addProduct(
        bytes32 _hashIPFS,
        uint8 _hashSize,
        uint8 _hashFunction,
        uint8 _vatPercentage,
        uint256 _netPrice
    )
        public
        onlyValidIpfsCid(_hashIPFS, _hashFunction, _hashSize)
        onlyBusiness
    {
        productStorage.addProduct(
            _hashIPFS,
            _hashSize,
            _hashFunction,
            _vatPercentage,
            _netPrice,
            msg.sender
        );

        emit ProductInserted(_hashIPFS, msg.sender, _netPrice, _vatPercentage, (_netPrice*(100+_vatPercentage)/100));
    }

    function modifyProduct(
        bytes32 _keyHash,
        bytes32 _hashIpfs,
        uint8 _hashSize,
        uint8 _hashFunction,
        uint8 _vatPercentage,
        uint256 _netPrice
    )
        public
        onlyValidIpfsCid(_keyHash, _hashFunction, _hashSize)
        onlyProductOwner(_keyHash)
    {
        require(_hashIpfs != _keyHash, "The modified product's hash cannot be the same as the key-hash");

        bool modified = false;

        if (_netPrice != 0) {
            productStorage.setNetPrice(_keyHash, _netPrice);
            modified = true;
        }

        if (_vatPercentage != 0) {
            productStorage.setVatPercentage(_keyHash, _vatPercentage);
            modified = true;
        }

        if (modified == true) {
            productStorage.setLatestHashIpfs(_keyHash, _hashIpfs);
            productStorage.setHashFunction(_keyHash, _hashFunction);
            productStorage.setHashSize(_keyHash, _hashSize);
            emit ProductModified(_keyHash, msg.sender, _hashIpfs);
        }

    }

    function deleteProduct(bytes32 _keyHash) public onlyValidKeyHash(_keyHash) onlyProductOwner(_keyHash) {
        productStorage.deleteProduct(_keyHash);
        emit ProductDeleted(_keyHash, msg.sender);
    }

    function calculateProductVat(bytes32 _keyHash) public view returns (uint256) {
        return (productStorage.getProductNetPrice(_keyHash) * productStorage.getProductVat(_keyHash) / 100);
    }

    function calculateProductGrossPrice(bytes32 _keyHash) public view returns (uint) {
        uint _netPrice = productStorage.getProductNetPrice(_keyHash);
        return (_netPrice + (_netPrice * productStorage.getProductVat(_keyHash) / 100));
    }


}
