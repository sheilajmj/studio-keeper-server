const ContactsService = {

    getAllContacts(knex){
        return knex.select('*').from('studiokeeper_contacts')
    },

    insertCatalogEntry(knex, newContact){
        return knex
            .insert(newContact)
            .into('studiokeeper_contacts')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    getById(knex,id){
        return knex.from('studiokeeper_contacts').select('*').where('id', id).first()
    },

    deleteCatalogItem(knex, id) {
        return knex('studiokeeper_contacts')
        .where({ id })
        .delete()
    },

    updateCatalogItem(knex, id, newContactFields){
        return knex('studiokeeper_contacts')
        .where({ id })
        .update(newContactFields)
    },

}

module.exports = ContactsService