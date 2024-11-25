// src/governance/proposalSystem.js
class ProposalSystem {
    constructor() {
        this.proposals = []; // Array to store proposals
        this.proposalIdCounter = 0; // Counter for unique proposal IDs
    }

    createProposal(description, proposer) {
        const proposalId = this.proposalIdCounter++;
        const newProposal = {
            id: proposalId,
            description,
            proposer,
            status: 'pending', // Status can be 'pending', 'approved', or 'rejected'
        };
        this.proposals.push(newProposal);
        return newProposal;
    }

    getProposal(proposalId) {
        return this.proposals.find(proposal => proposal.id === proposalId) || null;
    }

    updateProposalStatus(proposalId, status) {
        const proposal = this.getProposal(proposalId);
        if (!proposal) {
            throw new Error('Proposal not found');
        }
        proposal.status = status;
    }

    getAllProposals() {
        return this.proposals;
    }
}

module.exports = ProposalSystem;
