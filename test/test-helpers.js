const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeExpectedEvents(testUsers, TestEvents) {
    const user = testUsers
        .find(user => user.id === TestEvents.user_id)

    return {
        id: TestEvents.id,
        name: TestEvents.name,
        website: TestEvents.website,
        location: TestEvents.location,
        event_dates: TestEvents.event_dates,
        application_due_date: TestEvents.application_due_date,
        notes: TestEvents.notes,
        submission_requirements: TestEvents.submission_requirements,
    }
}

function makeExpectedContacts(testUsers, TestContacts) {
    const user = testUsers
        .find(user => user.id === TestContacts.user_id)

    return {
        id: TestContacts.id,
        contact_type: TestContacts.contact_type,
        business_name: TestContacts.business_name,
        name: TestContacts.name,
        title: TestContacts.title,
        email: TestContacts.email,
        phone: TestContacts.phone,
        address_street: TestContacts.address_street,
        address_line2: TestContacts.address_line2,
        address_city: TestContacts.address_city,
        address_state: TestContacts.address_state,
        address_zip: TestContacts.address_zip,
        address_country: TestContacts.address_country,
        website: TestContacts.website,
        notes: TestContacts.notes
    }
}

function makeExpectedCatalog(testUsers, TestCatalog) {
    const user = testUsers
        .find(user => user.id === TestCatalog.user_id)

    return {
        id: TestCatalog.id,
        type: TestCatalog.type,
        collection: TestCatalog.collection,
        name: TestCatalog.name,
        size: TestCatalog.size,
        medium: TestCatalog.medium,
        price: TestCatalog.price,
        date_created: TestCatalog.date_created,
        concept_statement: TestCatalog.concept_statement,
        notes: TestCatalog.notes,
        subject: TestCatalog.subject,
        quantity: TestCatalog.quantity,
        location: TestCatalog.location,
        sold_date: TestCatalog.sold_date,
        sold_to: TestCatalog.sold_to,
        history: TestCatalog.history
    }
}

function makeUsersArray() {
    return [{
        id: 1,
        full_name: "Full Name1",
        nickname: "Nickname1",
        user_name: "username1",
        password: "12345"
    },
    {
        id: 2,
        full_name: "Full Name2",
        nickname: "Nickname2",
        user_name: "username2",
        password: "12345"
    },
    {
        id: 3,
        full_name: "Full Name3",
        nickname: "Nickname3",
        user_name: "username3",
        password: "12345"
    },

    ]
}

function makeCatalogArray(users) {
    return [
        {
            id: 1,
            type: "Note Cards",
            collection: "Poured Acrylic Prints",
            name: "Winding",
            size: "4\"x6\"",
            medium: "Ink on Paper",
            price: "25.00",
            date_created: "2019-04-25T06:00:00.000Z",
            concept_statement: "This collection was created for fun sent through the mail.",
            notes: null,
            subject: "abstract",
            quantity: 20,
            location: "studio cabinet B",
            sold_date: null,
            sold_to: null,
            history: null
        },
        {
            id: 2,
            type: "Painting",
            collection: "Poured Acrylic",
            name: "The Path",
            size: "60\"x60\"",
            medium: "Acrylic on Canvas",
            price: "535.00",
            date_created: "2017-02-12T07:00:00.000Z",
            concept_statement: "This is a concept statement for this work",
            notes: "I created this in a bus heading to the moon",
            subject: null,
            quantity: 4,
            location: "kept in studio",
            sold_date: "2017-02-12T07:00:00.000Z",
            sold_to: "under contract with Mr. Buckles",
            history: "1/26/2020 Allstar Show"
        },
        {
            id: 3,
            type: "Painting",
            collection: "Poured Acrylic",
            name: "The Path",
            size: "60\"x60\"",
            medium: "Acrylic on Canvas",
            price: "535.00",
            date_created: "2017-02-12T07:00:00.000Z",
            concept_statement: "This is a concept statement for this work",
            notes: "I created this in a bus heading to the moon",
            subject: null,
            quantity: 4,
            location: "kept in studio",
            sold_date: "2018-06-12T06:00:00.000Z",
            sold_to: "event attendee",
            history: "1/26/2020 Allstar Show"
        }
    ]
}

function makeEventsArray() {
    return [
        {
            id: 1,
            user_id: 2,
            event_type: "art show",
            name: "ArtyArt",
            website: "art.com",
            location: "Lone Tree",
            event_dates: "2020-02-19T07:00:00.000Z",
            application_due_date: "2020-01-01T07:00:00.000Z",
            notes: "This is the show Jane Doe told me about",
            submission_requirements: "Letter of interest, images, application",
        },
        {
            id: 2,
            user_id: 3,
            event_type: "Vegetable Show",
            name: "Veggie Showcase",
            website: "jicama.com",
            location: "Lone Tree",
            event_dates: "2020-02-19T07:00:00.000Z",
            application_due_date: "2020-01-01T07:00:00.000Z",
            notes: "This is the show Art told me about",
            submission_requirements: "application",
        },
        {
            id: 3,
            user_id: 1,
            event_type: "Concert",
            name: "Battle of Awesome",
            website: "jam.com",
            location: "North East",
            event_dates: "2020-02-19T07:00:00.000Z",
            application_due_date: "2020-01-01T07:00:00.000Z",
            notes: "This is the show Jane Doe told me about",
            submission_requirements: "Letter of interest, images, application",
        },
    ]
}

function makeContactsArray(users) {
    return [
        {
            "id": 1,
            "contact_type": "Business",
            "business_name": "Mountain Song Gallery",
            "name": null,
            "title": null,
            "email": "hello@mountainsonggallery.com",
            "phone": "222-877-1234",
            "address_street": "1122 Streety Street",
            "address_line2": null,
            "address_city": "Mountain Town",
            "address_state": "CO",
            "address_zip": 33333,
            "address_country": "USA",
            "website": "MountainSongGallery.com",
            "notes": "Toured the gallery spring 2019, call back in the fall for information on exhibiting"
        },
        {
            "id": 2,
            "contact_type": "Individual",
            "business_name": "A Knife and Beet",
            "name": "Raul Romero",
            "title": "Manager",
            "email": "anotheremail@email.com",
            "phone": "555-889-9900",
            "address_street": "3434 Promenade Ave.",
            "address_line2": "Ste.18",
            "address_city": "Fancy Town",
            "address_state": "PA",
            "address_zip": 44444,
            "address_country": "USA",
            "website": null,
            "notes": "May have space in front dining room for three pieces"
        },
        {
            "id": 3,
            "contact_type": "Individual",
            "business_name": null,
            "name": "Alison Falcon",
            "title": "",
            "email": "afalcon@gmix.com",
            "phone": "101-224-9898",
            "address_street": "8221 Atlier Pl.",
            "address_line2": "#99",
            "address_city": "Richmond",
            "address_state": "VA",
            "address_zip": 55555,
            "address_country": "USA",
            "website": null,
            "notes": ""
        },
        {
            "id": 61,
            "contact_type": "Individual",
            "business_name": null,
            "name": "Sheila McLain Jagla",
            "title": null,
            "email": "starbone@gmail.com",
            "phone": "8505915119",
            "address_street": "16363 E FREMONT AVE",
            "address_line2": "APT 923",
            "address_city": "Aurora",
            "address_state": "CO",
            "address_zip": null,
            "address_country": "United States",
            "website": null,
            "notes": null
        }
    ]
}



function makeMaliciousCatalogEntry(user) {
    const maliciousCatalog = {
        id: 911,
        type: "Evil",
        collection: "Destruction",
        name: "Bad Bad Name",
        size: "XXL",
        medium: "Bones",
        price: 4.00,
        date_created: "2020-02-19T07:00:00.000Z",
        concept_statement: "Malicious concept",
        notes: "Coal only coal",
        images: "image4.jpg",
        subject: "Badness",
        quantity: 3,
        location: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
        sold_date: "2020-04-19T07:00:00.000Z",
        sold_to: "Naughty Entry",
        history: 'Naughty naughty very naughty <script>alert("xss");</script>'
    }
    const expectedCatalog = {
        ...makeExpectedCatalog([user], maliciousCatalog),
        name: "Bad Bad Name",
        notes: "Coal only coal",
    }
    return {
        maliciousCatalog, expectedCatalog
    }

}

function makeMaliciousEvent(user) {
    const maliciousEvent = {
        id: "666",
        event_type: "haunting",
        name: "death destruction",
        location: "South",
        event_dates: "2020-11-22T07:00:00.000Z",
        application_due_date: "2020-02-02T07:00:00.000Z",
        notes: "This is a very bad note",
        submission_requirements: "evil, malice",
    }
    const expectedEvent = {
        ...makeExpectedEvents([user], maliciousEvent),
        name: "death destruction",
        notes: "This is a very bad note",
    }
    return {
        maliciousEvent, expectedEvent
    }
}

function makeMaliciousContact(user) {
    const maliciousContact = {
        id: "888",
        contact_type: "Individual",
        business_name: null,
        name: "Really Bad",
        title: null,
        email: "evilbadmean@gmail.com",
        phone: "6666666666",
        address_street: "666 not it",
        address_line2: null,
        address_city: "next door",
        address_state: "SC",
        address_zip: null,
        address_country: "Meansville",
        website: null,
        notes: null
    }

    const expectedContact = {
        ...makeExpectedContacts([user], maliciousContact),
        name: "Really Bad",
        email: "evilbadmean@gmail.com",
    }
    return {
        maliciousContact, expectedContact
    }
}



function makeCatalogFixtures() {
    const testUsers = makeUsersArray()
    const testCatalog = makeCatalogArray(testUsers)
    return { testUsers, testCatalog }
}

function makeEventsFixtures() {
    const testUsers = makeUsersArray()
    const testEvents = makeEventsArray(testUsers)
    return { testUsers, testEvents }
}

function makeContactsFixtures() {
    const testUsers = makeUsersArray()
    const testContacts = makeContactsArray(testUsers)
    return { testUsers, testContacts }
}

function cleanTables(db) {
    return db.transaction(trx =>
        trx.raw(
            `TRUNCATE
                studiokeeper_contacts,
                studiokeeper_catalog,
                studiokeeper_events,
                studiokeeper_catalog_contacts_favorites,
                studiokeeper_catalog_events_connection,
                studiokeeper_contacts_events_relationship,
                studiokeeper_images,
                studiokeeper_users
                `
        )
            .then(() =>
                Promise.all([
                    trx.raw(`ALTER SEQUENCE studiokeeper_catalog_id_seq minvalue 0 START WITH 1`),
                    trx.raw(`ALTER SEQUENCE studiokeeper_users_id_seq minvalue 0 START WITH 1`),
                    trx.raw(`SELECT setval('studiokeeper_catalog_id_seq', 0)`),
                    trx.raw(`SELECT setval('studiokeeper_users_id_seq', 0)`),
                ])
            )
    )
}

function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1)
    }))
    return db.into('studiokeeper_users').insert(preppedUsers)
        .then(() =>
            db.raw(
                `SELECT setval('studiokeeper_users_id_seq', ?)`,
                [users[users.length - 1].id],
            )
        )
}

function seedCatalogTable(db, users, items) {
    return db.transaction(async trx => {
        await seedUsers(trx, users)
        await trx.into('studiokeeper_catalog').insert(items)
        await trx.raw(
            `SELECT setval('studiokeeper_catalog_id_seq', ?)`,
            [items[items.length - 1].id],
        )
    })
}

function seedEventsTable(db, users, items) {
    console.log(items, "events")
    return db.transaction(async trx => {
        await seedUsers(trx, users)
        await trx.into('studiokeeper_events').insert(items)
        await trx.raw(
            `SELECT setval('studiokeeper_events_id_seq', ?)`,
            [items[items.length - 1].id],
        )
    })
}

function seedContactsTable(db, users, items) {
    return db.transaction(async trx => {
        await seedUsers(trx, users)
        await trx.into('studiokeeper_contacts').insert(items)
        await trx.raw(
            `SELECT setval('studiokeeper_contacts_id_seq', ?)`,
            [items[items.length - 1].id],
        )
    })
}

function seedMaliciousCatalogEntry(db, user, item) {
    return seedUsers(db, [user])
        .then(() =>
            db
                .into('studiokeeper_catalog')
                .insert([item])
        )
}

function seedMaliciousEvents(db, user, item) {
    return seedUsers(db, [user])
        .then(() =>
            db
                .into('studiokeeper_events')
                .insert([item])
        )
}

function seedMaliciousContacts(db, user, item) {
    return seedUsers(db, [user])
        .then(() =>
            db
                .into('studiokeeper_contacts')
                .insert([item])
        )
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
        subject: user.full_name,
        algorithm: 'HS256',
    })
    return `Bearer ${token}`
}




module.exports = {
    makeExpectedEvents,
    makeExpectedContacts,
    makeExpectedCatalog,
    makeUsersArray,
    makeCatalogArray,
    makeEventsArray,
    makeMaliciousCatalogEntry,
    makeMaliciousEvent,
    makeMaliciousContact,
    makeCatalogFixtures,
    makeContactsFixtures,
    makeEventsFixtures,
    cleanTables,
    seedCatalogTable,
    seedContactsTable,
    seedEventsTable,
    seedMaliciousCatalogEntry,
    seedMaliciousEvents,
    seedMaliciousContacts,
    makeAuthHeader,
    seedUsers
}