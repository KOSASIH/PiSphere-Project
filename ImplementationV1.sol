// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Storage.sol";

contract ImplementationV1 is Storage {
    function setValue(uint256 _value) external {
        storedValue = _value;
    }

    function getValue() external view returns (uint256) {
        return storedValue;
    }
}
