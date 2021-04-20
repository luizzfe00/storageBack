require('dotenv').config();

const parser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');
const morgan = require('morgan'); 

// Database
require('./application/database');

const routes = require('./application/api/routes');
const LogService = require('./application/middlewares/services/log.service');
const environment = require('./config/environment');

// Services

// Routes

// Constants
const PORT = environment.API.PORT || 3001;

const application = express();

application.use(cors());
application.use(morgan('dev'));
application.use(parser.json({ limit: '5mb' }));
application.use(parser.urlencoded({ limit: '5mb', extended: false }));
application.use('/api', routes);
application.use(express.json(), function (req, res, next) {
  res.header("Allow", "OPTIONS, GET, POST");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();

});

const server = http.createServer(application);

server.listen(PORT, () => {
  LogService.info(`O projeto está rodando na porta ${PORT}.`);
});