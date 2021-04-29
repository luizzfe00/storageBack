module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', { 
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        unique: true,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      producerId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: 'Producers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      value: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      images: {
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
    await queryInterface.dropTable('Products');
  }
};
