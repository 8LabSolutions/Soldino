pragma solidity ^0.5.0;
import "../Authorizable.sol";

/**
  * Created: 2019-03-13
  * Modified: 2019-03-20
  * @author Mattia
  * @title Citizen contract
  * @dev This contract define the storage for the citizen-type user
  */
contract CitizenStorage is Authorizable{
    // The struct defines the characteristics of a citizen user
    struct Citizen {
        string email;
        string deliveryAddress;
        string name;
        string surname;
        bool active;
        uint index;
    }

    /*
    * This array is needed in order to verify if a user is registered
    */
    address[] internal citizenList;

    /*
    * The map addressToCitizen maps an addresso to a struct.
    * The key of the map is the user address (account address in Metamask)
    * The value of the map is a Citizen struct
    */
    mapping(address => Citizen) addressToCitizen;

    address governmentAddress;

    modifier onlyGovernment() {
        require(msg.sender == governmentAddress, "Only the government can able/disable users");
        _;
    }

    constructor (address _governmentAddress) public{
        governmentAddress = _governmentAddress;
    }

    function getName(address _userAddress) public view returns (string memory) {
        return addressToCitizen[_userAddress].name;
    }

    function getEmail(address _userAddress) public view returns (string memory) {
        return addressToCitizen[_userAddress].email;
    }

    function getDeliveryAddress(address _userAddress) public view returns (string memory) {
        return addressToCitizen[_userAddress].deliveryAddress;
    }

    function getActive(address _userAddress) public view returns (bool) {
        return addressToCitizen[_userAddress].active;
    }

    function getSurname(address _userAddress) public view returns (string memory) {
        return addressToCitizen[_userAddress].surname;
    }

    function setName(address _userAddress, string memory _name) public onlyAuthorized{
        addressToCitizen[_userAddress].name = _name;
    }

    function setEmail(address _userAddress, string memory _email) public onlyAuthorized{
        addressToCitizen[_userAddress].email = _email;
    }

    function setSurname(address _userAddress, string memory _surname) public onlyAuthorized{
        addressToCitizen[_userAddress].surname = _surname;
    }

    function setDeliveryAddress(address _userAddress, string memory _devAddress) public onlyAuthorized{
        addressToCitizen[_userAddress].deliveryAddress = _devAddress;
    }

    function setIndex(address _userAddress, uint _index) private onlyAuthorized{
        addressToCitizen[_userAddress].index = _index;
    }

    function setActive(address _userAddress, bool _active) public onlyGovernment {
        addressToCitizen[_userAddress].active = _active;
    }

    function getCitizenListLength() public view returns (uint){
        return citizenList.length;
    }

    function pushToCitizenList(address _userAddress) public onlyAuthorized {
        setIndex(_userAddress, citizenList.push(_userAddress) - 1);
        addressToCitizen[_userAddress].active = true;
    }
    /** @dev Returns a JSON rapresentation of the citizen given its address.
      * @param _userAddress :address Address of the user.
      * @return :string The JSON given as a string
      */
    function getCitizenDataJSON(address _userAddress) public view returns (
        string memory) {
        Citizen storage citizen =  addressToCitizen[_userAddress];
        return string(abi.encodePacked(
            "{\n",
                "  email: \"",citizen.email,
                "\",\n",
                "  name: \"",citizen.name,
                "\",\n",
                "  surname: \"",citizen.surname,
                "\",\n",
                "  deliveryAddress: \"", citizen.deliveryAddress,
            "\"\n}"
        ));
    }

}
