const express = require('express');
const path = require('path');

const expressApp = express();
const distPath = express.static(path.join(__dirname, './dist'));
const indexPath = path.join(__dirname, './index.html');
const port = (process.env.PORT || 8080);

expressApp.use('/dist', distPath);
expressApp.get('/', (_, response) => { response.sendFile(indexPath); });
expressApp.listen(port);
