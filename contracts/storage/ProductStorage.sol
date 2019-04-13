pragma solidity ^0.5.0;


import "../Authorizable.sol";

contract ProductStorage is Authorizable {
    struct ProductInfo {
        uint256 netPrice;
        bytes32 lastestHashIPFS;
        uint8 hashSize;
        uint8 hashFunction;
        uint8 VATPercentage;
        address seller;
        uint256 index;
    }

    bytes32[] public productsHash;
    mapping(bytes32 => ProductInfo) public hashToProduct;

    // Setters
    function setNetPrice(bytes32 _keyHash, uint256 _netPrice) external onlyAuthorized {
        hashToProduct[_keyHash].netPrice = _netPrice;
    }

    function setLatestHashIpfs(bytes32 _keyHash, bytes32 _newProdhash) external onlyAuthorized {
        hashToProduct[_keyHash].lastestHashIPFS = _newProdhash;
    }

    function setHashSize(bytes32 _keyHash, uint8 _hashSize) external onlyAuthorized {
        hashToProduct[_keyHash].hashSize = _hashSize;
    }

    function setHashFunction(bytes32 _keyHash, uint8 _hashFunction) external onlyAuthorized {
        hashToProduct[_keyHash].hashFunction = _hashFunction;
    }

    function setVatPercentage(bytes32 _keyHash, uint8 _vatPercentage) external onlyAuthorized {
        hashToProduct[_keyHash].VATPercentage = _vatPercentage;
    }

    function setSeller(bytes32 _keyHash, address _seller) external onlyAuthorized {
        hashToProduct[_keyHash].seller = _seller;
    }

    function pushHashIpfs(bytes32 _keyHash) external onlyAuthorized {
        productsHash.push(_keyHash);
    }

    function addProduct(
        bytes32 _keyHash,
        uint8 _hashSize,
        uint8 _hashFunction,
        uint8 _vatPercentage,
        uint256 _netPrice,
        address _seller
    )
        external
        onlyAuthorized
    {
        hashToProduct[_keyHash].lastestHashIPFS = _keyHash;
        hashToProduct[_keyHash].hashSize = _hashSize;
        hashToProduct[_keyHash].hashFunction = _hashFunction;
        hashToProduct[_keyHash].VATPercentage = _vatPercentage;
        hashToProduct[_keyHash].seller = _seller;
        hashToProduct[_keyHash].netPrice = _netPrice;
        hashToProduct[_keyHash].index = productsHash.push(_keyHash) - 1;

    }



    function deleteProduct(bytes32 _keyHash) external onlyAuthorized {
        delete productsHash[hashToProduct[_keyHash].index];
        delete hashToProduct[_keyHash];
    }

    function getProduct(bytes32 _keyHash) external view
        returns(
            bytes32,
            uint8,
            uint8,
            uint8,
            uint256,
            address
        )
    {
        return(
            hashToProduct[_keyHash].lastestHashIPFS,
            hashToProduct[_keyHash].hashSize,
            hashToProduct[_keyHash].hashFunction,
            hashToProduct[_keyHash].VATPercentage,
            hashToProduct[_keyHash].netPrice,
            hashToProduct[_keyHash].seller
        );
    }

    function getProductNetPrice(bytes32 _keyHash) external view returns(uint256) {
        return hashToProduct[_keyHash].netPrice;
    }

    function getProductVat(bytes32 _keyHash) external view returns(uint8) {
        return hashToProduct[_keyHash].VATPercentage;
    }

    function getLatestHash(bytes32 _keyHash) external view returns(bytes32) {
        return hashToProduct[_keyHash].lastestHashIPFS;
    }

    function getHashFunction(bytes32 _keyHash) external view returns(uint8) {
        return hashToProduct[_keyHash].hashFunction;
    }

    function getHashSize(bytes32 _keyHash) external view returns(uint8) {
        return hashToProduct[_keyHash].hashSize;
    }

    function getProductSeller(bytes32 _keyHash) external view returns(address) {
        return hashToProduct[_keyHash].seller;
    }
}
