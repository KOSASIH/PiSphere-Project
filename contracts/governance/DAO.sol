// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DAO is Initializable, Ownable {
    struct Proposal {
        string description;
        uint256 voteCount;
        mapping(address => bool) voters;
    }

    Proposal[] public proposals;

    function initialize() public initializer {
        // Initialization logic
    }

    function createProposal(string memory _description) public onlyOwner {
        Proposal storage newProposal = proposals.push();
        newProposal.description = _description;
        newProposal.voteCount = 0;
    }

    function vote(uint256 proposalIndex) public {
        Proposal storage proposal = proposals[proposalIndex];
        require(!proposal.voters[msg.sender], "Already voted.");
        proposal.voters[msg.sender] = true;
        proposal.voteCount++;
    }
}
