// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Escrow is Ownable {
    struct EscrowTransaction {
        address buyer;
        address seller;
        uint256 amount;
        bool completed;
    }

    mapping(uint256 => EscrowTransaction) public escrows;
    uint256 public escrowCount;

    event EscrowCreated(uint256 indexed id, address indexed buyer, address indexed seller, uint256 amount);
    event EscrowCompleted(uint256 indexed id);

    function createEscrow(address seller) external payable {
        require(msg.value > 0, "Amount must be greater than zero");
        escrowCount++;
        escrows[escrowCount] = EscrowTransaction(msg.sender, seller, msg.value, false);
        emit EscrowCreated(escrowCount, msg.sender, seller, msg.value);
    }

    function completeEscrow(uint256 id) external {
        EscrowTransaction storage escrow = escrows[id];
        require(msg.sender == escrow.buyer, "Only buyer can complete the escrow");
        require(!escrow.completed, "Escrow already completed");

        escrow.completed = true;
        payable(escrow.seller).transfer(escrow.amount);
        emit EscrowCompleted(id);
    }
}
