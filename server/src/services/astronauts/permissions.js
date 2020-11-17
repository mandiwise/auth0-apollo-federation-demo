const { rule, shield } = require("graphql-shield");

const isAuthenticated = rule()((parent, args, { user }, info) => {
  return user !== null;
});

const permissions = shield({
  Query: {
    astronaut: isAuthenticated,
    astronauts: isAuthenticated
  }
});

module.exports = permissions;
