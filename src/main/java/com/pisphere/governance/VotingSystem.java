package com.pisphere.governance;

import java.util.HashMap;
import java.util.Map;

public class VotingSystem {
    private Map<String, Integer> votes;

    public VotingSystem() {
        votes = new HashMap<>();
    }

    public void castVote(String proposal) {
        votes.put(proposal, votes.getOrDefault(proposal, 0) + 1);
        System.out.println("Vote cast for proposal: " + proposal);
    }

    public int getVotes(String proposal) {
        return votes.getOrDefault(proposal, 0);
    }
}
