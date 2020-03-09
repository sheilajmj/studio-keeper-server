const CatalogContactsService = {

    getCatalogAndContacts(knex, key, value){
        console.log("this is in the service")
        // const query = {}
        // query[key] = value;
        return knex.select('*').from('studiokeeper_catalog_contacts_favorites')
        // .where(query)
}
}

module.exports = CatalogContactsService