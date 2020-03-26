const CatalogImagesService = {

    getAllImages(knex, req){
        return knex.select('*').from('studiokeeper_images')
        .where(req)
    },

    insertImage(db, newCatalogImageItem){
       
        return db('studiokeeper_images')
        .insert(newCatalogImageItem)
        .into('studiokeeper_images')
        .returning('*')
        .then(rows => {
            return rows[0]
        })
},

}

module.exports = CatalogImagesService