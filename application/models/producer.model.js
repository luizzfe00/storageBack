module.exports = function (sequelize, DataTypes) {
  const Producer = sequelize.define('Producer', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: 'Informe um e-mail válido.' },
      },
      isEmail: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isLongEnough: function(val) {
          this.setDataValue('password', val);
          if (val.length < 8)
            throw new Error('A senha precisa ter pelo menos 8 caracteres.');
        }
      },
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    social: DataTypes.JSON,
    document: DataTypes.JSON,
    address: DataTypes.JSON,
  }, {
    classMethods: {
      associate: function (models) {
        Producer.hasMany(models.Product, { foreingKey: 'producerId', as: 'products' });
      },  
    },
  });

  return Producer;
};