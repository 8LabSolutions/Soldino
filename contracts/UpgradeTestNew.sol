pragma solidity 0.5.6;
import "./UpgradeTest.sol";

contract UpgradeTestV2 is UpgradeTest {

    //override
    function test() public pure returns(uint) {
        return 2;
    }

    //new function
    function testUpgrade() public returns(uint) {
        return 100;
    }
}
