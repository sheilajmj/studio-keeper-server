const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')


describe('Catalog Endpoints', function () {
    let db

    const {
        testUsers,
        testCatalogEntry, 
    } = helpers.makeCatalogFixtures()

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())
    before('cleanup', () => helpers.cleanTables(db))
    afterEach('cleanup', () => helpers.cleanTables(db))

    describe(`GET /api/catalog`, () => {
        context(`Given no items`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                .get('/api/catalog')
                .expect(200, [])
            })
        })
    })

//closing
})