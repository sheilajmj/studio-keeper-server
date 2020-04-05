const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')


describe('Catalog Endpoints', function () {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    describe(`GET /api/catalog/1`, () => {
        context(`Given selected item`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/catalog/1')
                    .expect(200, {
                        id: 1,
                        type: 'Painting',
                        collection: 'Poured Acrylic',
                        name: 'The Path',
                        size: '60"x60"',
                        medium: 'Acrylic on Canvas',
                        price: '535.00',
                        date_created: '2019-03-12T06:00:00.000Z',
                        concept_statement: 'This is a concept statement for this work',
                        notes: 'I created this in a bus heading to the moon',
                        subject: null,
                        quantity: 4,
                        location: 'kept in studio',
                        sold_date: '2020-01-24T07:00:00.000Z',
                        sold_to: 'event attendee',
                        history: '1/26/2020 Allstar Show'
                    })
            })
        })
    })

})