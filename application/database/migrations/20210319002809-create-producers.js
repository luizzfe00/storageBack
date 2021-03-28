'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Producers', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      businessName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      avatar: Sequelize.STRING,
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: Sequelize.STRING,
      phoneNumber: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      instagram: Sequelize.STRING,
      facebook: Sequelize.STRING,
      website: Sequelize.STRING,
      documentType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      documentNumber: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      issuer: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      issueDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      street: Sequelize.STRING,
      houseNumber: Sequelize.INTEGER,
      complement: Sequelize.STRING,
      district: Sequelize.STRING,
      city: Sequelize.STRING,
      state: Sequelize.STRING,
      zipCode: Sequelize.STRING,
      country: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Producers');
  }
};
