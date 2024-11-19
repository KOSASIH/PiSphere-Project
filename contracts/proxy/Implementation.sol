// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Implementation {
    // State variable example
    uint256 public value;

    // Event to log value changes
    event ValueChanged(uint256 newValue);

    // Function to set a new value
    function setValue(uint256 newValue) external {
        value = newValue;
        emit ValueChanged(newValue);
    }

    // Function to get the current value
    function getValue() external view returns (uint256) {
        return value;
    }
}
