const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const depthLimit = require('graphql-depth-limit');
const mongoose = require('mongoose');

const { APP, DATABASE } = require('./constants/config.const');
const { typeDefs } = require('./graphql/type-defs');
const { resolvers } = require('./graphql/resolvers');
const { getUserAuthentication } = require('./middlewares/auth.middleware');

const app = express();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: { requireResolversForResolveType: false }
});

const server = new ApolloServer({
  context: ({ req }) => getUserAuthentication(req),
  introspection: true,
  playground: true,
  schema,
  validationRules: [depthLimit(10)]
});

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

const PORT = process.env.PORT || APP.port;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Running server on port ${APP.port}`);
});
