const config = require('../../config/sequelize.database');
const LogService = require('../middlewares/services/log.service');
const sequelize = require('../models');

sequelize
  .authenticate()
  .then(() => LogService.info(`MySql conectado ao ambiente ${config.env}`))
  .catch((err) => LogService.error(`MySql com problema de conexão em ${config.env}. \nErro: ${err}`));
