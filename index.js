const { Band } = require('./models/Band')
const { Musician } = require('./models/Musician')
const { Song } = require("./models/Song")
const { Manager } = require('./models/Manager')
// Define associations here

Song.belongsToMany(Band, { through: 'band-song' });
Band.belongsToMany(Song, { through: 'band-song' });



module.exports = {
    Band,
    Musician,
    Song
};
