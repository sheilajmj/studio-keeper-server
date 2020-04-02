const CatalogImagesService = {

    getAllImages(knex, req){
        return knex.select('*').from('studiokeeper_images')
        .where(req)
    },

    insertCatalogImageData(db, newCatalogImageData){
       console.log("GOT HERE!")
        return db('studiokeeper_images')
        .insert(newCatalogImageData)
        .into('studiokeeper_images')
        .returning('*')
        .then(rows => {
            return rows[0]
        })
},

}

module.exports = CatalogImagesService