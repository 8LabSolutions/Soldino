pragma solidity 0.5.6;

import "./ContractManager.sol";
import "./UpgradeTest.sol";

contract UpgradeTestCaller {
    ContractManager cm;
    UpgradeTest ut;
    uint public store;

    constructor(address cmAdd) public {
        cm = ContractManager(cmAdd);
    }

    function testFun() public {
        ut = UpgradeTest(cm.getContractAddress("UpgradeTest"));
        store = ut.test();
    }
}
