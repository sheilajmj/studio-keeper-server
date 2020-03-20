const CatalogImagesService = {

    getCatalogImages(knex, req){
        return knex.select('*').from('studiokeeper_images')
        .where(req)
    }
}

module.exports = CatalogImagesService