require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server");
const { applyMiddleware } = require("graphql-middleware");
const { buildFederatedSchema } = require("@apollo/federation");
const fetch = require("node-fetch");

const permissions = require("./permissions");

const port = 4002;
const apiUrl = process.env.REST_API_URL;

const typeDefs = gql`
  type Mission {
    id: ID!
    crew: [Astronaut]
    designation: String!
    startDate: String
    endDate: String
  }

  extend type Astronaut @key(fields: "id") {
    id: ID! @external
    missions: [Mission]
  }

  extend type Query {
    mission(id: ID!): Mission
    missions: [Mission]
  }
`;

const resolvers = {
  Astronaut: {
    async missions(astronaut) {
      const res = await fetch(`${apiUrl}/missions`);
      const missions = await res.json();

      return missions.filter(({ crew }) =>
        crew.includes(parseInt(astronaut.id))
      );
    }
  },
  Mission: {
    crew(mission) {
      return mission.crew.map(id => ({ __typename: "Astronaut", id }));
    }
  },
  Query: {
    mission(_, { id }) {
      return fetch(`${apiUrl}/missions/${id}`).then(res => res.json());
    },
    missions() {
      return fetch(`${apiUrl}/missions`).then(res => res.json());
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
  console.log(`Missions service ready at ${url}`);
});
