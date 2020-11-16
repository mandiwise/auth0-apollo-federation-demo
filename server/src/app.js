const cors = require("cors");
const express = require("express");
const jwksClient = require("jwks-rsa");
const jwt = require("express-jwt");

const app = express();

const jwtCheck = jwt({
  secret: jwksClient.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ["RS256"],
  credentialsRequired: false
});

app.use(jwtCheck, (err, req, res, next) => {
  if (err.code === "invalid_token") {
    return next();
  }
  return next(err);
});

if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: "http://localhost:3000" }));
}

module.exports = app;
