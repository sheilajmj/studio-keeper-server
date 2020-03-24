const CatalogService = {

    getAllCatalogEntries(knex){
        return knex.select('*').from('studiokeeper_catalog')
    },

    insertCatalogEntry(knex, newCatalogEntry){
        console.log("GOT TO INSERT")
        return knex
            .insert(newCatalogEntry)
            .into('studiokeeper_catalog')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    getById(knex,id){
        return knex.from('studiokeeper_catalog').select('*').where('id', id).first()
    },

    deleteCatalogItem(knex, id) {
        return knex('studiokeeper_catalog')
        .where({ id })
        .delete()
    },

    updateCatalogItem(knex, id, newCatalogItemFields){
        return knex('studiokeeper_catalog')
        .where({ id })
        .update(newCatalogItemFields)
    },

    // getAllImages(knex){
    //     return knex.select('*').from('studiokeeper_images')
    // },


}

module.exports = CatalogService