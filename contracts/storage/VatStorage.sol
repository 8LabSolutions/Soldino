pragma solidity 0.5.6;

import "../Authorizable.sol";


contract VatStorage is Authorizable {
    enum VatState{DUE, OVERDUE, PAID, TO_BE_REFUNDED, REFUNDED}

    struct VatData {
        address business;
        VatState state;
        int256 amount;
    }

    mapping(bytes32 => VatData) public keyToVat;
    bytes32[] public keysArray;

    function getVatData(bytes32 _key) external view returns(address, uint, int256) {
        return(
            keyToVat[_key].business,
            uint(keyToVat[_key].state),
            keyToVat[_key].amount
        );
    }

    function getVatBusiness(bytes32 _key) external view returns(address) {
        return keyToVat[_key].business;
    }

    function getVatAmount(bytes32 _key) external view returns(int256) {
        return keyToVat[_key].amount;
    }

    function getVatState(bytes32 _key) external view returns(uint) {
        return uint(keyToVat[_key].state);
    }

    function setVatState(bytes32 _key, uint _state) external onlyAuthorized {
        keyToVat[_key].state = VatState(_state);
    }


    function insertVatAndSetState(
        bytes32 _key,
        address _business,
        int256 _amount
    )
        external
        onlyAuthorized
    {
        keyToVat[_key].business = _business;
        keyToVat[_key].amount += _amount;
        if (keyToVat[_key].amount < 0) {
            keyToVat[_key].state = VatState.TO_BE_REFUNDED;
        } else {
            keyToVat[_key].state = VatState.DUE;
        }
    }
}
