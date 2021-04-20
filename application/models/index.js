const filesystem = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const config = require('../../config/sequelize.database');

const database = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config.options);

filesystem
	.readdirSync(__dirname)
	.filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
	.forEach(file => {
		const model = require(path.join(__dirname, file))(sequelize, DataTypes);
		database[model.name] = model;
	});

Object.keys(database).forEach(modelName => {
	if (database[modelName].associate) {
		database[modelName].associate(database);
	}
});


database.sequelize = sequelize;
database.Sequelize = Sequelize;

module.exports = database;
