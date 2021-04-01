module.exports = function (sequelize, DataTypes) {
  const Auth = sequelize.define('Auth', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    userIP: DataTypes.STRING,
    userAgent: DataTypes.STRING,
    referrer: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function (models) {
        Auth.belongsTo(models.Producer, { foreingKey: 'producer_id', as: 'account' });
      }
    }
  });

  return Auth;
};