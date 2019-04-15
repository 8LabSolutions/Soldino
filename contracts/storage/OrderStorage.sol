pragma solidity 0.5.6;

import "../Authorizable.sol";


contract OrderStorage is Authorizable {
    struct Order {
        bytes32 keyHash;
        uint8 hashFunction;
        uint8 hashSize;
        address buyer;
        address seller;
        bytes32[] productsHash;
        uint256 netTotal;
        uint256 vatTotal;
    }

    mapping(bytes32 => Order) public hashToOrder;

    function setKeyHash(bytes32 _keyHash) external onlyAuthorized {
        hashToOrder[_keyHash].keyHash = _keyHash;
    }

    function setHashFunction(bytes32 _keyHash, uint8 _hashFun) external onlyAuthorized {
        hashToOrder[_keyHash].hashFunction = _hashFun;
    }

    function setHashSize(bytes32 _keyHash, uint8 _hashSize) external onlyAuthorized {
        hashToOrder[_keyHash].hashSize = _hashSize;
    }

    function setBuyer(bytes32 _keyHash, address _buyer) external onlyAuthorized {
        hashToOrder[_keyHash].buyer = _buyer;
    }

    function setSeller(bytes32 _keyHash, address _seller) external onlyAuthorized {
        hashToOrder[_keyHash].seller = _seller;
    }

    function setProducts(bytes32 _keyHash, bytes32[] calldata _products) external onlyAuthorized {
        hashToOrder[_keyHash].productsHash = _products;
    }

    function setNetTotal(bytes32 _keyHash, uint256 _amount) external onlyAuthorized {
        hashToOrder[_keyHash].netTotal = _amount;
    }

    function setVatTotal(bytes32 _keyHash, uint256 _amount) external onlyAuthorized {
        hashToOrder[_keyHash].vatTotal = _amount;
    }

    function addOrder (
        bytes32 _keyHash,
        uint8 _hashFun,
        uint8 _hashSize,
        address _buyer,
        address _seller,
        bytes32[] calldata _products,
        uint256 _netTotal,
        uint256 _vatTotal
    )
        external
        onlyAuthorized
    {
        hashToOrder[_keyHash].keyHash = _keyHash;
        hashToOrder[_keyHash].hashFunction = _hashFun;
        hashToOrder[_keyHash].hashSize = _hashSize;
        hashToOrder[_keyHash].seller = _seller;
        hashToOrder[_keyHash].buyer = _buyer;
        hashToOrder[_keyHash].productsHash = _products;
        hashToOrder[_keyHash].netTotal = _netTotal;
        hashToOrder[_keyHash].vatTotal = _vatTotal;
    }

    function getOrder(bytes32 _keyHash) public view
        returns(
            uint256,
            uint256,
            address,
            address,
            bytes32[] memory
        )
    {
        return(
            hashToOrder[_keyHash].netTotal,
            hashToOrder[_keyHash].vatTotal,
            hashToOrder[_keyHash].seller,
            hashToOrder[_keyHash].buyer,
            hashToOrder[_keyHash].productsHash
        );
    }

    function getBuyer(bytes32 _keyHash) public view returns (address) {
        return hashToOrder[_keyHash].buyer;
    }

    function getSeller(bytes32 _keyHash) public view returns (address) {
        return hashToOrder[_keyHash].seller;
    }

    function getOrderCid(bytes32 _keyHash) public view returns (bytes32, uint8, uint8) {
        return(
            hashToOrder[_keyHash].keyHash,
            hashToOrder[_keyHash].hashFunction,
            hashToOrder[_keyHash].hashSize
        );
    }

    function getOrderNetTotal(bytes32 _keyHash) public view returns (uint256) {
        return hashToOrder[_keyHash].netTotal;
    }

    function getOrderVatTotal(bytes32 _keyHash) public view returns (uint256) {
        return hashToOrder[_keyHash].vatTotal;
    }
}
