const { sequelize } = require("./db");
const { Band, Musician, Song } = require("./index");
const bands = require("./seed/bands.json");
const musicians = require("./seed/musicians.json");

describe("Band, Musician, and Song Models", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await sequelize.sync({ force: true });
  });

  test("can create a Band", async () => {
    // TODO - test creating a band
    const band = await Band.create({
      name: "Have a Nice Life",
      genre: "Post-Rock",
    });
    expect(band.name).toBe("Have a Nice Life");
    expect(band.genre).toBe("Post-Rock");

    const bands = await Band.findAll();
    expect(bands.length).toBe(1);
  });

  test("can create a Musician", async () => {
    // TODO - test creating a musician
    const musician = await Musician.create({
      name: "Van Halen",
      instrument: "Guitar",
    });
    expect(musician.name).toBe("Van Halen");
    expect(musician.instrument).toBe("Guitar");

    const bands = await Band.findAll();
    expect(bands.length).toBe(1);
  });

  test("can create a Song", async () => {
    // TODO - test creating a song
    const song = await Song.create({
      title: "Save Me",
      year: 2010,
      length: 11,
    });
    expect(song.title).toBe("Save Me");
    expect(song.year).toBe(2010);
    expect(song.length).toBe(11);

    const bands = await Band.findAll();
    expect(bands.length).toBe(1);
  });

  test("can update a Band", async () => {
    // TODO - test updating a band
    const band = await Band.findByPk(1);
    expect(band.name).toBe("Have a Nice Life");
    expect(band.genre).toBe("Post-Rock");

    const updatedBand = await band.update({
      name: "Have a Decent Life",
      genre: "Metal",
    });

    expect(updatedBand.name).toBe("Have a Decent Life");
    expect(updatedBand.genre).toBe("Metal");
  });

  test("can update a Musician", async () => {
    // TODO - test updating a musician
    const musician = await Musician.findByPk(1);
    expect(musician.name).toBe("Van Halen");
    expect(musician.instrument).toBe("Guitar");

    const updatedMusician = await musician.update({
      name: "Michael Jackson",
      instrument: "Vocals",
    });

    expect(updatedMusician.name).toBe("Michael Jackson");
    expect(updatedMusician.instrument).toBe("Vocals");
  });

  test("can update a Song", async () => {
    // TODO - test updating a song
    const song = await Song.findByPk(1);
    expect(song.title).toBe("Save Me");
    expect(song.year).toBe(2010);
    expect(song.length).toBe(11);

    const updatedSong = await song.update({
      title: "Rap Snitch Knishes",
      year: 2004,
      length: 3,
    });

    expect(updatedSong.title).toBe("Rap Snitch Knishes");
    expect(updatedSong.year).toBe(2004);
    expect(updatedSong.length).toBe(3);
  });

  test("can delete a Band", async () => {
    // TODO - test deleting a band
    const band = await Band.findByPk(1);
    expect(band.name).toBe("Have a Decent Life");
    expect(band.genre).toBe("Metal");
    await band.destroy();
    const bands = await Band.findAll();
    expect(bands.length).toBe(0);
  });

  test("can delete a Musician", async () => {
    // TODO - test deleting a musician
    const musician = await Musician.findByPk(1);
    expect(musician.name).toBe("Michael Jackson");
    expect(musician.instrument).toBe("Vocals");
    await musician.destroy();
    const musicians = await Musician.findAll();
    expect(musicians.length).toBe(0);
  });

  test("can delete a Song", async () => {
    // TODO - test deleting a song
    const song = await Song.findByPk(1);
    expect(song.title).toBe("Rap Snitch Knishes");
    expect(song.year).toBe(2004);
    expect(song.length).toBe(3);
    await song.destroy();
    const songs = await Song.findAll();
    expect(songs.length).toBe(0);
  });

  test("band can have many musicians", async function () {
    await sequelize.sync({ force: true }); // recreate db
    let myBand = await Band.create(bands[0]);
    let myMusician1 = await Musician.create(musicians[0]);
    let myMusician2 = await Musician.create(musicians[1]);
    await myBand.addMusician(myMusician1);
    await myBand.addMusician(myMusician2);
    const associatedMusicians = await myBand.getMusicians();
    expect(associatedMusicians.length).toBe(2);
    expect(associatedMusicians instanceof Musician).toBeTruthy;
  });

  test("musician can have only one band", async function () {
    await sequelize.sync({ force: true }); // recreate db
    let myBand = await Band.create(bands[0]);
    let myMusician = await Musician.create(musicians[0]);

    await myMusician.setBand(myBand);

    const associatedBand = await myMusician.getBand();
    expect(associatedBand instanceof Band).toBeTruthy();
  });
  
  test('can create a many-to-many relationship between Band and Song', async () => {
        // TODO - test creating a many-to-many relationship
        const band = await Band.create({ 
            name: 'Have a Nice Life', 
            genre: 'Post-Rock' 
        });
        const song = await Song.create({ 
            title: 'Save Me', 
            year: 2010, 
            length: 11
        });

        await band.addSong(song);

        const bandsWithSongs = await Band.findAll({
            include: Song
        });

        expect(bandsWithSongs[1].Songs.length).toBe(1);

        await band.destroy();
        await song.destroy();
    })

    test('testing eager loading', async () => {
      //find all bands -> bandfindall include, test output
      const bands = await Band.findAll( {
        include: Musician
      })

      expect(bands).toBeInstanceOf(Array)
      
      const bands2 = await Band.findAll( {
        include: Song
      })

      expect(bands2).toBeInstanceOf(Array)
    })
});
