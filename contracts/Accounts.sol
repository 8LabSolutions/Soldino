pragma solidity ^0.5.0;

contract Accounts {
    uint256 public balance;
    // Type of accounts on SOlidino
    // Gov = Government's account
    // Bus = Business's account
    // Cit = Citizen's account
    enum UserType { Gov, Bus, Cit }
    
    // Struct to store the email and userType of user
    struct UserStruct {
        bytes32 email;
        UserType userType;
        bool active;
        uint indexPointer;
    }

    // Array of addresses, in it is going to be saved the address of a user
    // the same address also is used to map the user i.e. to an address correspond
    // a userStruct struct
    address[] private userIndex;

    mapping(address => UserStruct) private UserStructs;

    // Function to check if a given address is mapped to an account
    function isRegistered(address userAddress) public view returns (bool isSaved) {
        if(userIndex.length == 0) return false;
        return(userIndex[UserStructs[userAddress].indexPointer] == userAddress);
    }

    ///  address the new user's address
    /// mail: user's mail
    /// @return a boolean telling if the operation went well
    function insertUser(address usAddress, bytes32 mail) public returns (bool success) {
        require(isRegistered(usAddress) == false, "User already registered");

        UserStructs[usAddress].email = mail;
        UserStructs[usAddress].userType = UserType.Cit;
        UserStructs[usAddress].active = true;
        UserStructs[usAddress].indexPointer = userIndex.push(usAddress) - 1;

        return true;
    }
    
    // Getter function
    function getUser(address userAddress) public view returns (
        bytes32 userMail, 
        UserType userType,
        bool active) {

        require(this.isRegistered(userAddress) == true, "User not found");
      
        return (UserStructs[userAddress].email,
                UserStructs[userAddress].userType,
                UserStructs[userAddress].active);
    }

    function f() public payable { balance = msg.value;}
    function() external payable{}
}