pragma solidity ^0.5.0;
import "../Authorizable.sol";

/**
* Created: 2019-03-13
* Modified: 2019-03-20
* @author Mattia
* @title Business contract
* @dev This contract define the storage for the business-type user
*/
contract BusinessStorage is Authorizable{
    // The struct defines the characteristics of a business user
    struct Business {
        string email;
        string deliveryAddress;
        string name;
        string VATNumber;
        bool active;
        uint index;
    }

    /*
    * This array is needed in order to verify if a user is registered
    */
    address[] internal businessList;
    /*
    * The map addressToBusiness maps an addresso to a struct.
    * The key of the map is the user address (account address in Metamask)
    * The value of the map is a Business struct
    */
    mapping(address => Business) addressToBusiness;

    address governmentAddress;

    modifier onlyGovernment() {
        require(msg.sender == governmentAddress, "Only the government can able/disable users");
        _;
    }

    constructor (address _governmentAddress) public{
        governmentAddress = _governmentAddress;
    }

    function getName(address _userAddress) public view returns (string memory) {
        return addressToBusiness[_userAddress].name;
    }

    function getEmail(address _userAddress) public view returns (string memory) {
        return addressToBusiness[_userAddress].email;
    }

    function getDeliveryAddress (address _userAddress) public view returns (string memory) {
        return addressToBusiness[_userAddress].deliveryAddress;
    }

    function getVATNumber (address _userAddress) public view returns (string memory) {
        return addressToBusiness[_userAddress].VATNumber;
    }

    function getActive(address _userAddress) public view returns (bool) {
        return addressToBusiness[_userAddress].active;
    }

    //******* SETTERS ********
    function setName(address _userAddress, string memory _name) public onlyAuthorized{
        addressToBusiness[_userAddress].name = _name;
    }

    function setEmail(address _userAddress, string memory _email) public onlyAuthorized{
        addressToBusiness[_userAddress].email = _email;
    }

    function setDeliveryAddress(address _userAddress, string memory _devAddress) public onlyAuthorized {
        addressToBusiness[_userAddress].deliveryAddress = _devAddress;
    }

    function setVATNumber(address _userAddress, string memory _VATNumber) public onlyAuthorized{
        addressToBusiness[_userAddress].VATNumber = _VATNumber;
    }

    function setIndex(address _userAddress, uint _index) private onlyAuthorized{
        addressToBusiness[_userAddress].index = _index;
    }

    function setActive(address _userAddress, bool _active) public onlyAuthorized {
        addressToBusiness[_userAddress].active = _active;
    }

    function getBusinessListLength() public view returns (uint){
        return businessList.length;
    }

    function pushToBusinessList(address _userAddress) public onlyAuthorized{
        setIndex(_userAddress, businessList.push(_userAddress) - 1);
        addressToBusiness[_userAddress].active = true;
    }

    function getBusinessDataJSON(address _userAddress) public view returns (
        string memory) {
        Business storage business =  addressToBusiness[_userAddress];
        return string(abi.encodePacked(
            "{\n",
                "  email: \"",business.email,
                "\",\n",
                "  name: \"",business.name,
                "\",\n",
                "  VATNumber: \"", business.VATNumber,
                "\",\n",
                "  deliveryAddress: \"", business.deliveryAddress,
            "\"\n}"
        ));
    }

}
