const { DataTypes, Model } = require('sequelize');

class Producer extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      businessName: DataTypes.STRING,
      avatar: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      instagram: DataTypes.STRING,
      facebook: DataTypes.STRING,
      website: DataTypes.STRING,
      documentType: DataTypes.STRING,
      documentNumber: DataTypes.STRING,
      issuer: DataTypes.STRING,
      issueDate: DataTypes.DATE,
      street: DataTypes.STRING,
      houseNumber: DataTypes.STRING,
      complement: DataTypes.STRING,
      district: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zipCode: DataTypes.STRING,
      country: DataTypes.STRING,
    }, {
      sequelize,
    });

    return this;
  }

  static associate(models) {
    Producer.hasMany(models.Product, { foreingKey: 'producer_id', as: 'products' });
    Producer.hasMany(models.Auth, { foreingKey: 'producer_id', as: 'account' });
  };
};

module.exports = Producer;