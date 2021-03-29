'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Login', { 
      account: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Producers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userIP: Sequelize.STRING,
      userAgent: Sequelize.STRING,
      referrer: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Login');
  }
};
