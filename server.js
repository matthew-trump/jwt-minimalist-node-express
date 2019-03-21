/**
 * Node Express JWT Example
 * 
 * run with 'node ./server.js'
 */
const express = require('express');
const path = require('path');

const cors = require('cors');
const bodyParser = require('body-parser');

const api = require('./api');

const app = express();

app.use(cors());
app.use(bodyParser.json());
//app.use(express.urlencoded());

app.use('/', express.static(path.join(__dirname, 'public')))
app.use("/api", api);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Node Express JWT Example listening on port ${PORT}`);
    console.log(`ENVIRONMENT ${process.env.ENVIRONMENT}`)
    console.log('Press Ctrl+C to quit.');

});