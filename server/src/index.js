require("dotenv").config();
const { ApolloGateway } = require("@apollo/gateway");
const { ApolloServer } = require("apollo-server-express");

const app = require("./app");

const port = 4000;

const gateway = new ApolloGateway({
  serviceList: [{ name: "astronauts", url: "http://localhost:4001" }]
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  context: ({ req }) => {
    const user = req.user || null;
    console.log("Checking for the user...", user);
    return { user };
  }
});

server.applyMiddleware({ app, cors: false });

app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
