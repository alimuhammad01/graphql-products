const express = require('express');
const { ApolloServer, gql } = require("apollo-server-express");
const faker = require("faker");
const times = require("lodash.times");
const random = require("lodash.random");
const typeDefs = require("./schema");
const resolvers = require("./resolvers.js");
const db = require("./models");
const playground = {
  settings: {
    "editor.cursorShape": "line"
  }
};

const server = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  context: { db },
  playground
});

const app = express();
server.applyMiddleware({ app });

app.use(express.static("app/public"));

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
// });