// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Storage.sol";

contract ImplementationV2 is Storage {
    function setValue(uint256 _value) external {
        storedValue = _value * 2; // Example: New logic (doubling the value)
    }

    function getValue() external view returns (uint256) {
        return storedValue;
    }
}
