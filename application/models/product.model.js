const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    super.init({
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      producerId: DataTypes.INTEGER,
      active: DataTypes.BOOLEAN,
      value: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
    }, {
      sequelize,
    });

    return this;
  }

  static associate(models) {
    Product.belongsTo(models.Producer, { foreingKey: 'producer_id', as: 'owner' });
  };
}

module.exports = Product;