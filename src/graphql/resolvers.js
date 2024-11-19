const Proposal = require('./models/Proposal');

const resolvers = {
    Query: {
        proposals: async () => await Proposal.find(),
    },
    Mutation: {
        createProposal: async (_, { description }) => {
            const newProposal = new Proposal({ description, voteCount: 0 });
            await newProposal.save();
            return newProposal;
        },
        vote: async (_, { proposalId }) => {
            const proposal = await Proposal.findById(proposal Id);
            if (!proposal) throw new Error("Proposal not found.");
            proposal.voteCount++;
            await proposal.save();
            return proposal;
        },
    },
};

module.exports = resolvers;
