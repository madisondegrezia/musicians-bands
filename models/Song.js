const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');

const Song = sequelize.define('Song', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  length: {
    type: DataTypes.INTEGER, // duration in seconds
    allowNull: false,
  },
});


module.exports = {
  Song,
};