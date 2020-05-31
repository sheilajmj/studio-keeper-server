const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');


describe('Catalog Endpoints', function () {
    let db
    const {
        testCatalog,
        testUsers,
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
        context(`Given no catalog`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/catalog')
                    .expect(200, [])
            })
        })

        context('Given there are catalog in the database', () => {
            beforeEach('insert catalog', () =>
                helpers.seedCatalogTable(
                    db,
                    testUsers,
                    testCatalog,
                )
            )

            it('responds with 200 and all of the catalog entries', () => {
                const expectedCatalog = testCatalog.map(catalog =>
                    helpers.makeExpectedCatalog(
                        testUsers,
                        catalog,
                    )
                )
                return supertest(app)
                    .get('/api/catalog')
                    .expect(200, expectedCatalog)
            })
        })
    })
    context(`Given an XSS attack article`, () => {
        const testUser = helpers.makeUsersArray()[1]
        const {
            maliciousCatalog,
            expectedCatalog,
        } = helpers.makeMaliciousCatalogEntry(testUser)

        beforeEach('insert malicious catalog', () => {
            return helpers.seedMaliciousCatalogEntry(
                db,
                testUser,
                maliciousCatalog,
            )
        })

        it('removes XSS attack content', () => {
            return supertest(app)
                .get(`/api/catalog`)
                .expect(200)
                .expect(res => {
                    expect(res.body[0].name).to.eql(expectedCatalog.name)
                    expect(res.body[0].notes).to.eql(expectedCatalog.notes)
                })
        })
    })

    describe(`GET /api/catalog/1`, () => {
        context(`Given no catalog entries`, () => {
            beforeEach(() =>
                helpers.seedUsers(db, testUsers)
            )

            it(`responds with 404`, () => {
                const catalogId = 123456
                return supertest(app)
                    .get(`/api/catalog/${catalogId}`)
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(404, { error: { "message": `Catalog item does not exist` } })
            })
        })
        context('Given there are catalog entries in the database', () => {
            beforeEach('insert catalog entries', () =>
                helpers.seedCatalogTable(
                    db,
                    testUsers,
                    testCatalog
                )
            )
            it(`responds with 200 and the selected catalog`, () => {
                const catalogId = 3
                const expectedCatalog = helpers.makeExpectedCatalog(
                    testUsers,
                    testCatalog[catalogId - 1],
                )
                return supertest(app)
                    .get(`/api/catalog/${catalogId}`)
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(200, expectedCatalog)
            }
            )
        })
    })
})

