module.exports = function (sequelize, DataTypes) {
  const Product = sequelize.define('Product', {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    images: DataTypes.JSON,
    producerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate: function(models) {
        Product.belongsTo(models.Producer, { foreingKey: 'producerId', as: 'owner' });
      }
    }
  });

  return Product;
};