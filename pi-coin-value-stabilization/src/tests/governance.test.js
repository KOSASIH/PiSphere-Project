// tests/governance.test.js
const GovernanceModel = require('../governance/governanceModel');
const VotingSystem = require('../governance/votingSystem');
const ProposalSystem = require('../governance/proposalSystem');

describe('Governance Mechanisms', () => {
    let governanceModel;
    let votingSystem;
    let proposalSystem;

    beforeEach(() => {
        governanceModel = new GovernanceModel();
        votingSystem = new VotingSystem();
        proposalSystem = new ProposalSystem();
    });

    test('should assign roles correctly', () => {
        governanceModel.assignRole('user1', governanceModel.roles.ADMIN);
        expect(governanceModel.getRole('user1')).toBe(governanceModel.roles.ADMIN);
    });

    test('should create a proposal', () => {
        const proposal = proposalSystem.createProposal('Increase block size', 'user1');
        expect(proposal).toHaveProperty('id');
        expect(proposal.title).toBe('Increase block size');
    });

    test('should allow voting on a proposal', () => {
        const proposal = proposalSystem.createProposal('Increase block size', 'user1');
        votingSystem.vote(proposal.id, 'user2', true);
        expect(votingSystem.getVotes(proposal.id)).toHaveProperty('yes', 1);
    });

    test('should not allow voting twice by the same user', () => {
        const proposal = proposalSystem.createProposal('Increase block size', 'user1');
        votingSystem.vote(proposal.id, 'user2', true);
        expect(() => votingSystem.vote(proposal.id, 'user2', false)).toThrow('User has already voted');
    });
});
