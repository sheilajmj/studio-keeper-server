const ContactsService = {

    getAllContacts(knex, req){
        return knex.select('*').from('studiokeeper_contacts')
        .where(req)
    },

    insertContact(knex, newContact){
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

    deleteContactItem(knex, id) {
        return knex('studiokeeper_contacts')
        .where({ id })
        .delete()
    },

    updateContactItem(knex, id, newContactFields){
        console.log("contactitem", newContactFields)
        return knex('studiokeeper_contacts')
        .where({ id })
        .update(newContactFields)
    },

}

module.exports = ContactsService