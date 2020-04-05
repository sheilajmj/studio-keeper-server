const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')

describe.only('Events Endpoints', function () {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    describe(`GET /api/events/1`, () => {
        context(`Given a selected event`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/events/1')
                    .expect(200, {
                        id: 1,
                        name: 'Out on Main',
                        website: 'cityweb.gov/outonmain',
                        location: 'main street USA',
                        event_dates: '2020-06-15T06:00:00.000Z',
                        application_due_date: '2020-05-01T06:00:00.000Z',
                        notes: 'Attended last year and it was a success! Amy said she could share a booth',
                        submission_requirements: 'letter of intent, portfolio link, deposit'
                    }


                    )
            })
        })
    })

})