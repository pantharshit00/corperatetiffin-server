const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const {
  fileLoader,
  mergeTypes,
  mergeResolvers,
} = require('merge-graphql-schemas');
const { makeExecutableSchema } = require('graphql-tools');
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');

const app = express();

app.use(morgan('common'));

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(() => ({
    schema,
  })),
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
);

app.listen(8080, () => {
  // eslint-disable-next-line no-console
  console.log('APP on PORT 8080');
});
