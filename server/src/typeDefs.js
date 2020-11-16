const { gql } = require("apollo-server");

const typeDefs = gql`
  type Astronaut {
    id: ID!
    name: String
  }

  type Mission {
    id: ID!
    crew: [Astronaut]
    designation: String!
    startDate: String
    endDate: String
  }

  type Query {
    astronaut(id: ID!): Astronaut
    astronauts: [Astronaut]
    mission(id: ID!): Mission
    missions: [Mission]
  }
`;

module.exports = typeDefs;
