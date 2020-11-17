require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server");
const fetch = require("node-fetch");

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
  typeDefs,
  resolvers
});

server.listen({ port }).then(({ url }) => {
  console.log(`Astronauts service ready at ${url}`);
});
