const express = require('express')
const CatalogImagesService = require('./catalog-images-service')
const router = express.Router()
jsonParser = express.json()
const multer = require('multer')
const serializeCatalogImage = catalog => ({
  "image_name": catalog.image_name,
  "catalog_id": catalog.catalog_id,
  "image_url": catalog.image_url
})
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, res, cb) { cb(null, ''); },
  
  filename: function(req, file, cb){
    const now = new Date().toISOString();
    const date = now.replace(/:/g, '-');
    cb(null, date + file.originalname); }
});

const fileFilter = (req, file, cb) => {
  if (
    !file.mimetype.includes("jpeg") &&
    !file.mimetype.includes("jpg") &&
    !file.mimetype.includes("png") &&
    !file.mimetype.includes("gif")
  ) {
    return cb(null, false, new Error("Only images are allowed"));
  }
  cb(null, true);
}


const upload = multer({ 
  storage: storage,
  limits: {
      fileSize: 1024 * 1024 * 5,
      fileFilter: fileFilter
    } 
  });


router
   .route('/images')
   .get((req, res, next) => {
     const knexInstance = req.app.get('db')
     CatalogImagesService.getAllImages(knexInstance, req.query)
       .then(catalog => {
         res.json(catalog.map(serializeCatalogImage))
       })
       .catch(next)
   })
   
   .post(upload.single('image'), (req, res, next) => {
     const newCatalogImageData = { 
       user_id: 1,
       image_name: req.file.filename,
       catalog_id: req.body.catalog_id,
       image_url: req.file.path
     }

     CatalogImagesService.insertCatalogImageData(
           req.app.get('db'),
           newCatalogImageData
         )
         .then(item => {
           res
             .status(201)
             .json(serializeCatalogImage(item))
         })
         .catch(next)
       })        

module.exports = router



  
    
