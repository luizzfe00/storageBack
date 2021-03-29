const { DataTypes, Model } = require('sequelize');

class Auth extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      userIP: DataTypes.STRING,
      userAgent: DataTypes.STRING,
      referrer: DataTypes.STRING,
    }, {
      sequelize,
    });

    return this;
  }

  static associate(models) {
    Auth.belongsTo(models.Producer, { foreingKey: 'producer_id', as: 'account' });
  };
};

module.exports = Auth;