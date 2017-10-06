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
  createPost: ({ input }) => client.query(`
      INSERT INTO posts (text, user_id) VALUES ($1, $2)
        RETURNING creation_date, id, text, user_id
    `,
    [input.text, input.user_id]
  ).then((results) => {
    const post = results.rows[0];

    return {
      edge: { node: post },
      post,
    };
  }),
  createUser: ({ input }) => client.query(`
      INSERT INTO users (name, pswhash) VALUES ($1, crypt($2, gen_salt('md5')))
        RETURNING id, name
    `,
    [input.name, input.password]
  ).then((results) => {
    return { user: results.rows[0] };
  }),
  login: ({ input }) => client.query(`
      SELECT * FROM users WHERE
        (SELECT pswhash FROM users WHERE name = $1) = 
        crypt(
          $2,
          (SELECT pswhash FROM users WHERE name = $1)
        );
    `,
    [input.name, input.password]
  ).then((results) => {
    return { user: results.rows[0] };
  }),
  viewer: {
    id: 0,
    posts: ({ sortColumn, sortDirection }) => {
      return client.query(`
          SELECT * FROM posts ORDER BY ${sortColumn} ${sortDirection}
        `
      ).then((results) => {
        const edges = results.rows.map((row) => {
          return { node: row };
        });

        return { edges };
      });
    },
  },
};
const schema = graphql.buildSchema(rawSchema);
const sendIndex =  (_, response) => { response.sendFile(indexPath); };

client.connect();
expressApp.use(bodyParser.json());
expressApp.use('/dist', distPath);
expressApp.use('/graphql', graphqlHTTP({
  graphiql: true,
  rootValue,
  schema,
}));
expressApp.get('/', sendIndex);
expressApp.get('/createAccount', sendIndex);
expressApp.get('/login', sendIndex);
expressApp.get('/posts', sendIndex);
expressApp.listen(port);
