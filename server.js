const express = require('express');

const Posts = require('./data/db')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});






//export default server
module.exports = server; //exporting of the server
