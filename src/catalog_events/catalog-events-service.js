const CatalogEventsService = {

    getCatalogAndEvents(knex, req){
        return knex.select('*').from('studiokeeper_catalog_events_connection')
        .where(req)
    }
}

module.exports = CatalogEventsService