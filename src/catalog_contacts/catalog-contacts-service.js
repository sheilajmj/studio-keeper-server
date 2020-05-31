const CatalogContactsService = {

    getCatalogAndContacts(knex, req){
        return knex.select('*').from('studiokeeper_catalog_contacts_favorites')
        .where(req)
}
};


module.exports = CatalogContactsService