// contracts/multiSigWallet.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MultiSigWallet {
    uint256 public requiredSignatures;
    address[] public owners;
    mapping(uint256 => mapping(address => bool)) public confirmations;
    mapping(uint256 => Transaction) public transactions;
    uint256 public transactionCount;

    struct Transaction {
        address to;
        uint256 value;
        bool executed;
    }

    event TransactionCreated(uint256 transactionId, address indexed to, uint256 value);
    event TransactionConfirmed(uint256 transactionId, address indexed owner);
    event TransactionExecuted(uint256 transactionId);

    constructor(address[] memory _owners, uint256required) {
        require(_owners.length > 0, "Owners required");
        require(required > 0 && required <= _owners.length, "Invalid number of required signatures");
        owners = _owners;
        requiredSignatures = required;
    }

    function createTransaction(address to, uint256 value) external onlyOwners {
        transactionCount++;
        transactions[transactionCount] = Transaction(to, value, false);
        emit TransactionCreated(transactionCount, to, value);
    }

    function confirmTransaction(uint256 transactionId) external onlyOwners {
        require(!transactions[transactionId].executed, "Transaction already executed");
        require(!confirmations[transactionId][msg.sender], "Transaction already confirmed");

        confirmations[transactionId][msg.sender] = true;
        emit TransactionConfirmed(transactionId, msg.sender);

        if (isConfirmed(transactionId)) {
            executeTransaction(transactionId);
        }
    }

    function executeTransaction(uint256 transactionId) internal {
        Transaction storage txn = transactions[transactionId];
        require(!txn.executed, "Transaction already executed");
        require(isConfirmed(transactionId), "Not enough confirmations");

        txn.executed = true;
        (bool success, ) = txn.to.call{value: txn.value}("");
        require(success, "Transaction failed");
        emit TransactionExecuted(transactionId);
    }

    function isConfirmed(uint256 transactionId) public view returns (bool) {
        uint256 count = 0;
        for (uint256 i = 0; i < owners.length; i++) {
            if (confirmations[transactionId][owners[i]]) {
                count++;
            }
            if (count == requiredSignatures) {
                return true;
            }
        }
        return false;
    }

    modifier onlyOwners() {
        bool isOwner = false;
        for (uint256 i = 0; i < owners.length; i++) {
            if (msg.sender == owners[i]) {
                isOwner = true;
                break;
            }
        }
        require(isOwner, "Not an owner");
        _;
    }

    receive() external payable {}
}
