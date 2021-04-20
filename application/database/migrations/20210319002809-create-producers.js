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
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING
      },
      businessName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      social: {
        type: Sequelize.JSON
      },
      document: {
        type: Sequelize.JSON,
      },
      address: {
        type: Sequelize.JSON,
      },
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
