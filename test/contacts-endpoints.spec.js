const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')


describe('Contact Endpoints', function () {
    let db


    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    describe(`GET /api/contacts/1`, () => {
        context(`Given a selected contact`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/contacts/1')
                    .expect(200, {
                        id: 1,
                        contact_type: 'Business',
                        business_name: 'Mountain Song Gallery',
                        name: null,
                        title: null,
                        email: 'hello@mountainsonggallery.com',
                        phone: '222-877-1234',
                        address_street: '1122 Streety Street',
                        address_line2: null,
                        address_city: 'Mountain Town',
                        address_state: 'CO',
                        address_zip: 33333,
                        address_country: 'USA',
                        website: 'MountainSongGallery.com',
                        notes: 'Toured the gallery spring 2019, call back in the fall for information on exhibiting'
                    }

                    )
            })
        })
    })
})