const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
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
const rawSchema = fs.readFileSync('./schema.graphql', 'utf-8');
const rootValue = {
  createUser: ({ input }) => client.query(
    'INSERT INTO users (name, pswhash) VALUES ($1, crypt($2, gen_salt(\'md5\'))) RETURNING id, name',
    [input.name, input.password]
  ).then((results) => {
    return { user: results.rows[0] };
  }),
};
const schema = graphql.buildSchema(rawSchema);

client.connect();
expressApp.use(bodyParser.json());
expressApp.use('/dist', distPath);
expressApp.use('/graphql', graphqlHTTP({
  graphiql: true,
  rootValue,
  schema,
}));
expressApp.get('/', (_, response) => { response.sendFile(indexPath); });
expressApp.listen(port);
