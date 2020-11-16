require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");

const app = require("./app");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

const port = 4000;
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, cors: false });

app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
