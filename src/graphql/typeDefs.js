const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Proposal {
        id: ID!
        description: String!
        voteCount: Int!
    }

    type Query {
        proposals: [Proposal]
    }

    type Mutation {
        createProposal(description: String!): Proposal
        vote(proposalId: ID!): Proposal
    }
`;

module.exports = typeDefs;
