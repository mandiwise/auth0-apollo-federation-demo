require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server");
const { applyMiddleware } = require("graphql-middleware");
const { buildFederatedSchema } = require("@apollo/federation");
const fetch = require("node-fetch");

const permissions = require("./permissions");

const port = 4001;
const apiUrl = process.env.REST_API_URL;

const typeDefs = gql`
  type Astronaut @key(fields: "id") {
    id: ID!
    name: String
  }

  extend type Query {
    astronaut(id: ID!): Astronaut
    astronauts: [Astronaut]
  }
`;

const resolvers = {
  Astronaut: {
    __resolveReference(ref) {
      return fetch(`${apiUrl}/astronauts/${ref.id}`).then(res => res.json());
    }
  },
  Query: {
    astronaut(_, { id }) {
      return fetch(`${apiUrl}/astronauts/${id}`).then(res => res.json());
    },
    astronauts() {
      return fetch(`${apiUrl}/astronauts`).then(res => res.json());
    }
  }
};

const server = new ApolloServer({
  schema: applyMiddleware(
    buildFederatedSchema([{ typeDefs, resolvers }]),
    permissions
  ),
  context: ({ req }) => {
    const user = req.headers.user ? JSON.parse(req.headers.user) : null;
    return { user };
  }
});

server.listen({ port }).then(({ url }) => {
  console.log(`Astronauts service ready at ${url}`);
});
