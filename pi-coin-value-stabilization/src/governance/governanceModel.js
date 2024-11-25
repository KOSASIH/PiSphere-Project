// src/governance/governanceModel.js
class GovernanceModel {
    constructor() {
        this.roles = {
            ADMIN: 'admin',
            VOTER: 'voter',
            PROPOSER: 'proposer',
        };
        this.roleAssignments = new Map(); // Maps user addresses to roles
    }

    assignRole(userAddress, role) {
        if (!Object.values(this.roles).includes(role)) {
            throw new Error('Invalid role');
        }
        this.roleAssignments.set(userAddress, role);
    }

    getRole(userAddress) {
        return this.roleAssignments.get(userAddress) || null;
    }

    isAdmin(userAddress) {
        return this.getRole(userAddress) === this.roles.ADMIN;
    }

    isVoter(userAddress) {
        return this.getRole(userAddress) === this.roles.VOTER;
    }

    isProposer(userAddress) {
        return this.getRole(userAddress) === this.roles.PROPOSER;
    }
}

module.exports = GovernanceModel;
