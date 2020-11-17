const { rule, shield } = require("graphql-shield");

const isAuthenticated = rule()((parent, args, { user }, info) => {
  return user !== null;
});

const permissions = shield({
  Query: {
    mission: isAuthenticated,
    missions: isAuthenticated
  }
});

module.exports = permissions;
