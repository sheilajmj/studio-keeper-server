const EventsService = {

    getAllEvents(knex){
        return knex.select('*').from('studiokeeper_events')
    },

    insertEvent(knex, newEventEntry){
        return knex
            .insert(newCatalogEntry)
            .into('studiokeeper_events')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    getById(knex,id){
        return knex.from('studiokeeper_events').select('*').where('id', id).first()
    },

    deleteEvent(knex, id) {
        return knex('studiokeeper_events')
        .where({ id })
        .delete()
    },

    updateEvent(knex, id, newEventFields){
        return knex('studiokeeper_events')
        .where({ id })
        .update(newEventFields)
    },

}

module.exports = EventsService