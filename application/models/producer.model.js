const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = function (sequelize, DataTypes) {
  const Producer = sequelize.define('Producer', {
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
    avatar: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    instagram: DataTypes.STRING,
    facebook: DataTypes.STRING,
    website: DataTypes.STRING,
    documentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    documentNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    issuer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    issueDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    document: {
      type: DataTypes.VIRTUAL,
      get() {

        const body = {
          type: this.documentType,
          number: this.documentNumber,
          issuer: this.issuer,
          issueDate: this.issueDate,
        };

        return body;
      },
      set(value) {
        throw new Error('Do not try to set the `document` value!');
      }
    },
    street: DataTypes.STRING,
    houseNumber: DataTypes.INTEGER,
    complement: DataTypes.STRING,
    district: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    country: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function (models) {
        Producer.hasMany(models.Product, { foreingKey: 'producerId', as: 'products' });
        Producer.hasMany(models.Auth, { foreingKey: 'producerId', as: 'account' });
      },  
    },
  });

  return Producer;
};