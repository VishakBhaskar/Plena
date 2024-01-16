// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.0;

contract Test {
    bool paid = false;

    constructor() payable {
        paid = true;
    }

    function transferFunds(address _address, bytes calldata _payload) external {
        (bool status, ) = _address.delegatecall(_payload);
        require(status, "Forwarded call failed.");
    }

    receive() external payable {}

    fallback() external payable {}
}
