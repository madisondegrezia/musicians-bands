const {DataTypes, sequelize, Model} = require('../db');

// TODO - define the Musician model
let Musician = sequelize.define("Musician", {
    name: DataTypes.STRING,
    instrument: DataTypes.STRING
});

module.exports = {
    Musician
};