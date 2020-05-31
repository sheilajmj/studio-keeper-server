const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');


describe('Contact Endpoints', function () {
    let db
    const {
        testContacts,
        testUsers,
    } = helpers.makeContactsFixtures()

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

    describe(`GET /api/contacts`, () => {
        context(`Given no contacts`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/contacts')
                    .expect(200, [])
            })
        })

        context('Given there are contacts in the database', () => {
            beforeEach('insert contacts', () =>
                helpers.seedContactsTable(
                    db,
                    testUsers,
                    testContacts,
                )
            )

            it('responds with 200 and all of the contacts', () => {
                const expectedContacts = testContacts.map(contact =>
                    helpers.makeExpectedContacts(
                        testUsers,
                        contact,
                    )
                )
                return supertest(app)
                    .get('/api/contacts')
                    .expect(200, expectedContacts)
            })
        })
    })
    context(`Given an XSS attack article`, () => {
        const testUser = helpers.makeUsersArray()[1]
        const {
            maliciousContact,
            expectedContact,
        } = helpers.makeMaliciousContact(testUser)

        beforeEach('insert malicious contact', () => {
            return helpers.seedMaliciousContacts(
                db,
                testUser,
                maliciousContact,
            )
        })

        it('removes XSS attack content', () => {
            return supertest(app)
                .get(`/api/contacts`)
                .expect(200)
                .expect(res => {
                    expect(res.body[0].name).to.eql(expectedContact.name)
                    expect(res.body[0].notes).to.eql(expectedContact.notes)
                })
        })
    })

    describe(`GET /api/contacts/1`, () => {
        context(`Given no contacts`, () => {
            beforeEach(() =>
                helpers.seedUsers(db, testUsers)
            )

            it(`responds with 404`, () => {
                const contactId = 123456
                return supertest(app)
                    .get(`/api/contacts/${contactId}`)
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(404, { error: { "message": `Contact does not exist` } })
            })
        })
        context('Given there are contacts in the database', () => {
            beforeEach('insert contacts', () =>
                helpers.seedContactsTable(
                    db,
                    testUsers,
                    testContacts
                )
            )
            it(`responds with 200 and the selected contact`, () => {
                const contactId = 3
                const expectedContact = helpers.makeExpectedContacts(
                    testUsers,
                    testContacts[contactId - 1],
                )
                return supertest(app)
                    .get(`/api/contacts/${contactId}`)
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(200, expectedContact)
            }
            )
        })
    })
})

