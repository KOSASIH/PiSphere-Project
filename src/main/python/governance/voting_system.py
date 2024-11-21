class VotingSystem:
    def __init__(self):
        self.votes = {}

    def cast_vote(self, proposal):
        self.votes[proposal] = self.votes.get(proposal, 0) + 1
        print(f"Vote cast for proposal: {proposal}. Total votes: {self.votes[proposal]}")

    def get_votes(self, proposal):
        return self.votes.get(proposal, 0)
