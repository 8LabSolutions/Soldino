pragma solidity 0.5.6;

import "../Authorizable.sol";

contract VatStorage is Authorizable {
    struct VatData {
        address business;
        uint256 dateDue;
        uint8 state;
        uint256 amount;
    }

    mapping(bytes32 => VatData) public keyToVat;
    bytes32[] keysArray;

    function getVatData(bytes32 _key) external view returns(address, uint256, uint8, uint256) {
        return(
            keyToVat[_key].business,
            keyToVat[_key].dateDue,
            keyToVat[_key].state,
            keyToVat[_key].amount
        );
    }

    function getVatBusiness(bytes32 _key) external view returns(address) {
        return keyToVat[_key].business;
    }

    function setVatState(bytes32 _key, uint8 _state) external onlyAuthorized {
        keyToVat[_key].state = _state;
    }

    function setDateDue(bytes32 _key, uint256 _newDate) external onlyAuthorized {
        keyToVat[_key].dateDue = _newDate;
    }

    function insertVat(
        bytes32 _key,
        address _business,
        uint256 _amount,
        uint256 _dateDue
    )
        external
        onlyAuthorized
    {
        keyToVat[_key].business = _business;
        keyToVat[_key].dateDue = _dateDue;
        keyToVat[_key].state = 1;
        keyToVat[_key].amount = _amount;
    }


}
