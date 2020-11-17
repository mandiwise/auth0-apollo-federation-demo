const { rule, shield } = require("graphql-shield");

const isAuthenticated = rule()((parent, args, { user }, info) => {
  return user !== null;
});
