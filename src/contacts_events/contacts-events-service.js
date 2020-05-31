const ContactsEventsService = {

    getContactsAndEvents(knex, req){
        return knex.select('*').from('studiokeeper_contacts_events_relationship')
        .where(req)
    }
};


module.exports = ContactsEventsService