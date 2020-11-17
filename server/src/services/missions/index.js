require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const fetch = require("node-fetch");

const port = 4002;
const apiUrl = process.env.REST_API_URL;

const typeDefs = gql`
  type Mission {
    id: ID!
    crew: [Astronaut] # Where does astronaut come from?
    designation: String!
    startDate: String
    endDate: String
  }

  extend type Query {
    mission(id: ID!): Mission
    missions: [Mission]
  }
`;

const resolvers = {
  Mission: {
    crew(mission) {
      // How do we resolve this now?
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
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen({ port }).then(({ url }) => {
  console.log(`Missions service ready at ${url}`);
});
