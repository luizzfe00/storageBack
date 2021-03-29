const Sequelize = require('sequelize');

const config = require('../../config/sequelize.database');

const sequelize = new Sequelize(config.database, config.username, config.password, config.options);

const Auth = require('./auth.model');
const Producer = require('./producer.model');
const Product = require('./product.model');

Producer.init(sequelize);
Product.init(sequelize);
Auth.init(sequelize);

Producer.associate(sequelize.models);
Product.associate(sequelize.models);
Auth.associate(sequelize.models);



module.exports = sequelize;