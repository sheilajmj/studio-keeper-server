const CatalogImagesService = {

    getCatalogImages(knex, req){
        return knex.select('*').from('studiokeeper_images')
        .where(req)
    },
    insertImage(db){
        return db('studiokeeper_images')
            //   .where({ user_name })
            //   .update({ image_name, catalog_id})
            //   .returning('*')
            //   .then(([user]) => user)
          },
    

}

module.exports = CatalogImagesService