require("dotenv").config();
const { ApolloGateway, RemoteGraphQLDataSource } = require("@apollo/gateway");
const { ApolloServer } = require("apollo-server-express");

const app = require("./app");

const port = 4000;

const gateway = new ApolloGateway({
  serviceList: [
    { name: "astronauts", url: "http://localhost:4001" },
    { name: "missions", url: "http://localhost:4002" }
  ],
  buildService({ url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        request.http.headers.set(
          "user",
          context.user ? JSON.stringify(context.user) : null
        );
      }
    });
  }
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  context: ({ req }) => {
    const user = req.user || null;
    return { user };
  }
});

server.applyMiddleware({ app, cors: false });

app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
