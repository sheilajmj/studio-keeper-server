const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


function makeUsersArray(){
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

function makeCatalogArray() {
    return [
        {
            id: 1,
            user_id: 1, 
            type: "Type 1", 
            collection: "Collection 1",
            name: "Name 1", 
            size: "Size 1", 
            medium: "Medium 1", 
            price: 1.00, 
            date_created: 2020/01/01, 
            concept_statement: "Concept Statment 1", 
            notes: "Notes 1", 
            images: "image1.jpg",
            subject: "Subject 1", 
            quantity:  1,
            location: "Location1",
            sold_date: 1999/01/01, 
            sold_to: "Sold To 1",
            history: "History 1"
        },
        {
            id: 2,
            user_id: 2, 
            type: "Type 2", 
            collection: "Collection 2",
            name: "Name 2", 
            size: "Size 2", 
            medium: "Medium 1", 
            price: 2.00, 
            date_created: 2020/02/02, 
            concept_statement: "Concept Statment 2", 
            notes: "Notes 2", 
            images: "image2.jpg",
            subject: "Subject 2", 
            quantity:  2,
            location: "Location2",
            sold_date: 1999/02/02, 
            sold_to: "Sold To 2",
            history: "History 2"
        },
        {
            id: 3,
            user_id: 3, 
            type: "Type 3", 
            collection: "Collection 3",
            name: "Name 3", 
            size: "Size 3", 
            medium: "Medium 3", 
            price: 3.00, 
            date_created: 2020/03/03, 
            concept_statement: "Concept Statment 3", 
            notes: "Notes 3", 
            images: "image3.jpg",
            subject: "Subject 3", 
            quantity:  3,
            location: "Location3",
            sold_date: 1999/03/03, 
            sold_to: "Sold To 3",
            history: "History 3"
        },
        {
            id: 4,
            user_id: 4, 
            type: "Type 4", 
            collection: "Collection 4",
            name: "Name 4", 
            size: "Size 4", 
            medium: "Medium 4", 
            price: 4.00, 
            date_created: 2020/04/04, 
            concept_statement: "Concept Statment 4", 
            notes: "Notes 4", 
            images: "image4.jpg",
            subject: "Subject 4", 
            quantity:  3,
            location: "Location4",
            sold_date: 1999/04/04, 
            sold_to: "Sold To 4",
            history: "History 4"
        },
    ]
    }
    
    
    function makeMaliciousCatalogEntry(){
        return{
            id: 911,
            user_id: 666, 
            type: "Evil", 
            collection: "Destruction",
            name: "Bad Bad Name", 
            size: "XXL", 
            medium: "Bones", 
            price: 4.00, 
            date_created: 2020/04/04, 
            concept_statement: "Malicious concept", 
            notes: "Coal only coal", 
            images: "image4.jpg",
            subject: "Badness", 
            quantity:  3,
            location: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
            sold_date: 1999/04/04, 
            sold_to: "Naughty Entry",
            history: 'Naughty naughty very naughty <script>alert("xss");</script>'
      }
    }

    function makeCatalogFixtures() {
        const testUsers = makeUsersArray()
        const testCatalogEntry = makeCatalogArray(testUsers)
        return { testUsers, testCatalogEntry }
    }

    function cleanTables(db){
        return db.transaction(trx => 
            trx.raw(
                `TRUNCATE
                studiokeeper_catalog,
                studiokeeper_events,
                studiokeeper_contacts,
                studiokeeper_users,
                studiokeeper_catalog_contacts_favorites,
                studiokeeper_catalog_events_connection,
                studiokeeper_contacts_events_relationship

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

function seedUsers(db, users){
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
      
function seedCatalogTable (db, users, items){
    return db.transaction(async trx => {
        await seedUsers(trx, users)
        await trx.into('studiokeeper_catalog').insert(items)
        await trx.raw(
            `SELECT setval('studiokeeper_catalog_id_seq', ?)`,
            [items[items.length -1].id],
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

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
           subject: user.full_name,
           algorithm: 'HS256',
         })
        return `Bearer ${token}`
  }

  module.exports = {
    makeUsersArray,
    makeCatalogArray,
    makeMaliciousCatalogEntry,
  
    makeCatalogFixtures,
    cleanTables,
    seedCatalogTable,
    seedMaliciousCatalogEntry,
    makeAuthHeader,
    seedUsers,
  }