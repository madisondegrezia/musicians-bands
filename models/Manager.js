const { sequelize, DataTypes, Model } = require('../db');

class Manager extends Model {}

Manager.init(
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    salary: DataTypes.FLOAT,
    dateHired: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Manager',
  }
);

module.exports = { Manager };
