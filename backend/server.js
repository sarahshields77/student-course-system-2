const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
require('dotenv').config();

const app = express();
connectDB();

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({ req }) });
server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen(5000, () => console.log("Server running on port 5000"));
});
