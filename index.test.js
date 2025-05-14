const { sequelize } = require('./db');
const { Band, Musician, Song } = require('./index')

describe('Band, Musician, and Song Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        const band = await Band.create({ 
            name: 'Have a Nice Life', 
            genre: 'Post-Rock' 
        });
        expect(band.name).toBe('Have a Nice Life');
        expect(band.genre).toBe('Post-Rock');
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const musician = await Musician.create({ 
            name: 'Van Halen', 
            instrument: 'Guitar' 
        });
        expect(musician.name).toBe('Van Halen');
        expect(musician.instrument).toBe('Guitar');
    })

    test('can update a Band', async () => {
        // TODO - test updating a band
        const band = await Band.create({ 
            name: 'Have a Decent Life', 
            genre: 'Metal'
        });

        expect(band.name).toBe('Have a Decent Life');
        expect(band.genre).toBe('Metal');
        
        const updatedBand = await band.update({
            name: 'Have a Nice Life', 
            genre: 'Post-Rock'
        })

        expect(updatedBand.name).toBe('Have a Nice Life');
        expect(updatedBand.genre).toBe('Post-Rock');
    })

    test('can update a Musician', async () => {
        // TODO - test updating a musician
        const musician = await Musician.create({ 
            name: 'Van Halen', 
            instrument: 'Guitar'
        });

        expect(musician.name).toBe('Have a Decent Life');
        expect(musician.instrument).toBe('Guitar');
        
        const updatedBand = await band.update({
            name: 'Michael Jackson', 
            instrument: 'Vocals'
        })

        expect(musician.name).toBe('Michael Jackson');
        expect(musician.instrument).toBe('Vocals');
    })

    test('can delete a Band', async () => {
        // TODO - test deleting a band
        const band = await Band.create({ 
            name: 'Have a Nice Life', 
            genre: 'Post-Rock' 
        });
        expect(band.name).toBe('Have a Nice Life');
        expect(band.genre).toBe('Post-Rock');        
        await band.destroy();
        const bands = await Band.findAll();
        expect(bands.length).toBe(0);
    })

    test('can delete a Musician', async () => {
        // TODO - test deleting a musician
        const musician = await Musician.create({ 
            name: 'Van Halen', 
            instrument: 'Guitar' 
        });
        expect(musician.name).toBe('Van Halen');
        expect(musician.instrument).toBe('Guitar');        
        await musician.destroy();
        const musicians = await Musician.findAll();
        expect(musicians.length).toBe(0);
    })
})