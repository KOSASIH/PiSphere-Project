const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}${server.graphqlPath}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });
