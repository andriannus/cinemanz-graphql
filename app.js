const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const { APP, DATABASE } = require('./constants/config.const');
const { typeDefs } = require('./graphql/type-defs');
const { resolvers } = require('./graphql/resolvers');

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

mongoose.connect(
  DATABASE.mongoUri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    const message = err || 'Connected';
    // eslint-disable-next-line no-console
    console.log(`MongoDB: ${message}`);
  }
);

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

server.applyMiddleware({ app });

app.listen(APP.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running server on port ${APP.port}`);
});
