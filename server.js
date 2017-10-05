const bodyParser = require('body-parser');
const express = require('express');
const graphql = require('graphql');
const graphqlHTTP = require('express-graphql');
const path = require('path');
const pg = require('pg');

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL
});
const expressApp = express();
const distPath = express.static(path.join(__dirname, './dist'));
const indexPath = path.join(__dirname, './index.html');
const port = (process.env.PORT || 8080);
const rootValue = {
  counter: (variables) => client
    .query('SELECT * from counters where id = $1', [variables.id])
    .then((response) => {
      return { count: response.rows[0].count, id: variables.id };
    }),
  setCount: (variables) => client
    .query('UPDATE counters SET count = $1 where id = $2', [variables.count, variables.id])
    .then(() => {
      return { count: variables.count, id: variables.id };
    }),
};
const schema = graphql.buildSchema(`
  interface Node {
    id: ID!
  }

  type Counter implements Node {
    count: Int
    id: ID!
  }

  type Mutation {
    setCount(id: ID!, count: Int): Counter
  }

  type Query {
    counter(id: ID!): Counter
  }
`);

client.connect();
expressApp.use(bodyParser.json());
expressApp.use('/dist', distPath);
expressApp.use('/graphql', graphqlHTTP({
  graphiql: true,
  rootValue,
  schema,
}));
expressApp.get('/', (_, response) => { response.sendFile(indexPath); });
expressApp.get('/db/count', (request, response) => {
  client.query('SELECT * from count').then((result) => {
    response.send(result);
  }).catch((error) => {
    response.status(500).send(error);
  });
});
expressApp.post('/db/count', (request, response) => {
  const count = request.body.count;
  const values = [count];

  client.query('UPDATE count SET count = $1', values).then((result) => {
    response.send(result);
  }).catch((error) => {
    response.status(500).send(error);
  });
});
expressApp.listen(port);
