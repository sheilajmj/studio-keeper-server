const EventsService = {

    getAllEvents(knex){
        return knex.select('*').from('studiokeeper_events')
    },

    insertEvent(knex, newEventItem){
        return knex
            .insert(newEventItem)
            .into('studiokeeper_events')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    getById(knex,id){
        return knex.from('studiokeeper_events').select('*').where('id', id).first()
    },

    deleteEventItem(knex, id) {
        return knex('studiokeeper_events')
        .where( { id } )
        .delete()
    },

    updateEventItem(knex, id, newEventFields){
        return knex('studiokeeper_events')
        .where({ id })
        .update(newEventFields)
    },

};


module.exports = EventsService