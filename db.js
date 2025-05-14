const path = require("path");
const { DataTypes, Sequelize } = require("sequelize");

// TODO - create the new sequelize connection
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "db.sqlite"),
});

module.exports = {
  sequelize,
  DataTypes,
};
