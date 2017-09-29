const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const pg = require('pg');

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL
});
const expressApp = express();
const distPath = express.static(path.join(__dirname, './dist'));
const indexPath = path.join(__dirname, './index.html');
const port = (process.env.PORT || 8080);

client.connect();
expressApp.use(bodyParser.json());
expressApp.use('/dist', distPath);
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
