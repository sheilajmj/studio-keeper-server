const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Events Endpoints', function () {
    let db
    const {
        testEvents,
        testUsers,
    } = helpers.makeEventsFixtures()


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


    describe(`GET /api/events`, () => {
        context(`Given no events`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/events')
                    .expect(200, [])
            })
        })

        context('Given there are events in the database', () => {
            beforeEach('insert events', () =>
                helpers.seedEventsTable(
                    db,
                    testUsers,
                    testEvents,
                )
            )

            it('responds with 200 and all of the events', () => {
                const expectedEvents = testEvents.map(event =>
                    helpers.makeExpectedEvents(
                        testUsers,
                        event,
                    )
                )
                return supertest(app)
                    .get('/api/events')
                    .expect(200, expectedEvents)
            })
        })


        context(`Given an XSS attack article`, () => {
            const testUser = helpers.makeUsersArray()[1]
            const {
                maliciousEvent,
                expectedEvent,
            } = helpers.makeMaliciousEvent(testUser)

            beforeEach('insert malicious event', () => {
                return helpers.seedMaliciousEvents(
                    db,
                    testUser,
                    maliciousEvent,
                )
            })

            it('removes XSS attack content', () => {
                return supertest(app)
                    .get(`/api/events`)
                    .expect(200)
                    .expect(res => {
                        expect(res.body[0].name).to.eql(expectedEvent.name)
                        expect(res.body[0].notes).to.eql(expectedEvent.notes)
                    })
            })
        })
    })

    describe(`GET /api/events/1`, () => {
        context(`Given no events`, () => {
            beforeEach(() =>
                helpers.seedUsers(db, testUsers)
            )

            it(`responds with 404`, () => {
                const eventId = 123456
                return supertest(app)
                    .get(`/api/events/${eventId}`)
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(404, { error: { "message": `Event does not exist` } })
            })
        })

        context('Given there are events in the database', () => {
            beforeEach('insert events', () =>
                helpers.seedEventsTable(
                    db,
                    testUsers,
                    testEvents
                )
            )

        it(`responds with 200 and the selected event`, () => {
            const eventId = 3
            const expectedEvent = helpers.makeExpectedEvents(
                testUsers,
                testEvents[eventId - 1],
            )
            return supertest(app)
                .get(`/api/events/${eventId}`)
                .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                .expect(200, expectedEvent)
        }
        )
    })
})

})
