// src/governance/reputationSystem.js
class ReputationSystem {
    constructor() {
        this.reputationScores = new Map(); // Maps user addresses to reputation scores
    }

    increaseReputation(userAddress, amount) {
        const currentScore = this.reputationScores.get(userAddress) || 0;
        this.reputationScores.set(userAddress, currentScore + amount);
    }

    decreaseReputation(userAddress, amount) {
        const currentScore = this.reputationScores.get(userAddress) || 0;
        this.reputationScores.set(userAddress, Math.max(0, currentScore - amount));
    }

   getReputation(userAddress) {
        return this.reputationScores.get(userAddress) || 0;
    }
}

module.exports = ReputationSystem;
