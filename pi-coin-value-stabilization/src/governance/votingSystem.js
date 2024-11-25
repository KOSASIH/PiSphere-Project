// src/governance/votingSystem.js
class VotingSystem {
    constructor() {
        this.votes = new Map(); // Maps proposal IDs to votes
        this.proposalVotes = new Map(); // Maps proposal IDs to vote counts
    }

    castVote(proposalId, userAddress, vote) {
        if (!this.votes.has(proposalId)) {
            this.votes.set(proposalId, new Map());
        }
        const userVotes = this.votes.get(proposalId);
        
        if (userVotes.has(userAddress)) {
            throw new Error('User  has already voted on this proposal');
        }

        userVotes.set(userAddress, vote);
        this.updateVoteCount(proposalId, vote);
    }

    updateVoteCount(proposalId, vote) {
        if (!this.proposalVotes.has(proposalId)) {
            this.proposalVotes.set(proposalId, { yes: 0, no: 0 });
        }
        const currentVotes = this.proposalVotes.get(proposalId);
        
        if (vote === 'yes') {
            currentVotes.yes += 1;
        } else if (vote === 'no') {
            currentVotes.no += 1;
        }
    }

    getVoteCount(proposalId) {
        return this.proposalVotes.get(proposalId) || { yes: 0, no: 0 };
    }
}

module.exports = VotingSystem;
