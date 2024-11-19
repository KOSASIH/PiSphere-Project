// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Voting is Initializable, Ownable {
    using SafeMath for uint256;

    struct Proposal {
        string description;
        uint256 voteCount;
        uint256 endTime;
        bool executed;
        mapping(address => bool) voters;
    }

    IERC20 public token; // ERC20 token used for voting
    Proposal[] public proposals;
    mapping(address => address) public delegates; // Delegated voting

    event ProposalCreated(uint256 proposalId, string description, uint256 endTime);
    event Voted(uint256 proposalId, address voter, uint256 voteCount);
    event ProposalExecuted(uint256 proposalId);

    modifier onlyBeforeEnd(uint256 proposalId) {
        require(block.timestamp < proposals[proposalId].endTime, "Voting has ended");
        _;
    }

    modifier onlyAfterEnd(uint256 proposalId) {
        require(block.timestamp >= proposals[proposalId].endTime, "Voting is still ongoing");
        _;
    }

    function initialize(IERC20 _token) public initializer {
        token = _token;
    }

    function createProposal(string memory _description, uint256 _duration) external onlyOwner {
        uint256 endTime = block.timestamp.add(_duration);
        proposals.push(Proposal({
            description: _description,
            voteCount: 0,
            endTime: endTime,
            executed: false
        }));
        emit ProposalCreated(proposals.length - 1, _description, endTime);
    }

    function vote(uint256 proposalId) external onlyBeforeEnd(proposalId) {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.voters[msg.sender], "You have already voted");

        uint256 voterBalance = token.balanceOf(msg.sender);
        require(voterBalance > 0, "You have no voting power");

        proposal.voters[msg.sender] = true;
        proposal.voteCount = proposal.voteCount.add(voterBalance);
        emit Voted(proposalId, msg.sender, voterBalance);
    }

    function executeProposal(uint256 proposalId) external onlyAfterEnd(proposalId) {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal already executed");

        // Logic to execute the proposal (e.g., transferring funds, etc.)
        // This is where you would integrate with an oracle if needed.

        proposal.executed = true;
        emit ProposalExecuted(proposalId);
    }

    function delegateVoting(address to) external {
        require(to != msg.sender, "Cannot delegate to yourself");
        delegates[msg.sender] = to;
    }

    function getDelegate(address voter) external view returns (address) {
        return delegates[voter];
    }

    function getProposal(uint256 proposalId) external view returns (string memory, uint256, uint256, bool) {
        Proposal storage proposal = proposals[proposalId];
        return (proposal.description, proposal.voteCount, proposal.endTime, proposal.executed);
    }
}
