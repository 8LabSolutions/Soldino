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
    }

    mapping(bytes32 => Order) public hashToOrder;

    event OrderPlaced(
        address indexed _buyer,
        address indexed _seller,
        bytes32 _keyHash,
        uint8 _hashFun,
        uint8 _hashSize
    );

    function addOrder (
        bytes32 _keyHash,
        uint8 _hashFun,
        uint8 _hashSize,
        address _buyer,
        address _seller,
        bytes32[] memory _products
    )
        public
        onlyAuthorized
    {
        hashToOrder[_keyHash].keyHash = _keyHash;
        hashToOrder[_keyHash].hashFunction = _hashFun;
        hashToOrder[_keyHash].hashSize = _hashSize;
        hashToOrder[_keyHash].buyer = _buyer;
        hashToOrder[_keyHash].seller = _seller;
        hashToOrder[_keyHash].productsHash = _products;
    }


    function getOrder(bytes32 _keyHash) public view
        returns(
            bytes32,
            uint8,
            uint8,
            address,
            address,
            bytes32[] memory
        )
    {
        return(
            hashToOrder[_keyHash].keyHash,
            hashToOrder[_keyHash].hashFunction,
            hashToOrder[_keyHash].hashSize,
            hashToOrder[_keyHash].seller,
            hashToOrder[_keyHash].buyer,
            hashToOrder[_keyHash].productsHash
        );
    }

}
