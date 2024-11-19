// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Proxy {
    // Storage for the address of the implementation contract
    address private implementation;

    // Event to log upgrades
    event Upgraded(address indexed newImplementation);

    // Constructor to set the initial implementation
    constructor(address _implementation) {
        implementation = _implementation;
    }

    // Fallback function to delegate calls to the implementation
    fallback() external payable {
        _delegate(implementation);
    }

    // Function to upgrade the implementation contract
    function upgradeTo(address newImplementation) external {
        require(newImplementation != address(0), "New implementation is the zero address");
        implementation = newImplementation;
        emit Upgraded(newImplementation);
    }

    // Internal function to delegate calls
    function _delegate(address _implementation) internal {
        assembly {
            // Copy msg.data. We take full control of memory in this inline assembly
            // and we allocate a memory area of the same size as the msg.data
            calldatacopy(0, 0, calldatasize())

            // Call the implementation contract
            // Out: return data
            let result := delegatecall(gas(), _implementation, 0, calldatasize(), 0, 0)

            // Copy the returned data
            returndatacopy(0, 0, returndatasize())

            switch result
            case 0 { revert(0, returndatasize()) } // If the call failed, revert
            default { return(0, returndatasize()) } // Otherwise, return the data
        }
    }
}
