pragma solidity ^0.5.0;


import "./storage/TokenCubit.sol";

contract Escrow is tokenRecipient{
    // accounts who have sent cubit to the contract
    TokenERC20 cubitContract;
    mapping (address => uint256) public registrantsPaid;

    event OrderReceived(address _from, address _to, uint256 _ammount);

    constructor(address _token) public {
        cubitContract = TokenERC20(_token);
    }

    //override
    function receiveApproval(address _from, uint256 _value, address _token /*, bytes calldata _extraData*/) external {
       TokenERC20 cubitToken = TokenERC20(_token);
       require(cubitToken.transferFrom(_from, address(this), _value));
       registrantsPaid[_from] += _value;
    }

    function confirmBuy(address _seller, uint256 _value) public {
        registrantsPaid[msg.sender] -= _value;
        cubitContract.transfer(_seller, _value);
        emit OrderReceived(msg.sender, _seller, _value);
    }

    /*function test(TokenERC20[] memory array) public {

    }*/
}
