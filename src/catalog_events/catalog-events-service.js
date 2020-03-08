const CatalogEventsService = {

    getCatalogAndEvents(knex, key, value){
        // const query = {}
        // query[key] = value;
        return knex.select('*').from('studiokeeper_catalog_events_connection')
        // .where(query)
}
}

module.exports = CatalogEventsService