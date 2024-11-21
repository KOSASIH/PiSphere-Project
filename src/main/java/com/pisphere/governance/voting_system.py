from governance_token import GovernanceToken
from typing import Dict, List, Any
from collections import defaultdict

class VotingSystem:
    def __init__(self, governance_token: GovernanceToken):
        self.governance_token = governance_token
        self.proposals = {}
        self.votes = defaultdict(lambda: defaultdict(float))
        self.proposal_count = 0

    def create_proposal(self, description: str) -> int:
        """Create a new proposal."""
        self.proposal_count += 1
        self.proposals[self.proposal_count] = {
            'description': description,
            'yes_votes': 0,
            'no_votes': 0,
            'voters': set(),
            'status': 'pending'
        }
        print(f"Proposal {self.proposal_count} created: {description}")
        return self.proposal_count

    def vote(self, proposal_id: int, voter: str, support: bool):
        """Vote on a proposal."""
        if proposal_id not in self.proposals:
            raise ValueError("Proposal not found.")
        if voter in self.proposals[proposal_id]['voters']:
            raise ValueError("Voter has already voted.")

        vote_weight = self.governance_token.get_balance(voter)
        if vote_weight == 0:
            raise ValueError("Voter has no voting power.")

        self.proposals[proposal_id]['voters'].add(voter)
        if support:
            self.proposals[proposal_id]['yes_votes'] += vote_weight
        else:
            self.proposals[proposal_id]['no_votes'] += vote_weight

        print(f"{voter} voted {'yes' if support else 'no'} on proposal {proposal_id}.")

    def finalize_proposal(self, proposal_id: int):
        """Finalize a proposal after voting."""
        if proposal_id not in self.proposals:
            raise ValueError("Proposal not found.")

        proposal = self.proposals[proposal_id]
        if proposal['status'] != 'pending':
            raise ValueError("Proposal has already been finalized.")

        total_yes_votes = proposal['yes_votes']
        total_no_votes = proposal['no_votes']
        total_votes = total_yes_votes + total_no_votes

        if total_votes == 0:
            proposal['status'] = 'no votes'
            print(f"Proposal {proposal_id} finalized with no votes.")
            return

        quorum = total_votes * 0.5  # Example quorum requirement
        if total_yes_votes > quorum:
            proposal['status'] = 'approved'
            print(f"Proposal {proposal_id} approved with {total_yes_votes} yes votes.")
        else:
            proposal['status'] = 'rejected'
            print(f"Proposal {proposal_id} rejected with {total_no_votes} no votes.")

    def get_proposal_status(self, proposal_id: int) -> Dict[str, Any]:
        """Get the status of a proposal."""
        if proposal_id not in self.proposals:
            raise ValueError("Proposal not found.")
        return self.proposals[proposal_id]

    def get_all_proposals(self) -> List[Dict[str, Any]]:
        """Get all proposals."""
        return self.proposals.values()
 
