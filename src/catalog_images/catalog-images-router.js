const express = require('express')
const CatalogImagesService = require('./catalog-images-service')
const catalogImagesRouter = express.Router()
const bodyParser = express.json()
const { requireAuth } = require('../middleware/jwt-auth')
jsonParser = express.json()
const multer = require('multer')
const serializeCatalogImageItem = catalog => ({
  "image_name": catalog.image_name,
  "catalog_id": catalog.catalog_id
})
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, res, cb) { cb(null, __dirname + '../../..' + '/public/uploads/'); },
  
  filename: function(req, file, cb){
    const now = new Date().toISOString();
    const date = now.replace(/:/g, '-');
    cb(null, date + file.originalname); }
});

const upload = multer({ 
  storage: storage
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    res.json({
      error: `Wrong file type submitted. Upload only .png or .jpeg`
    })
    cb(null, false);
  }
}


//   storage: storage, limits: {
//   fileSize: 1024 * 1024 * 5,
//   fileFilter: fileFilter
// } }).single('images');


// const serializeCatalogImageItem = item => ({
//     "catalog_id": item.catalog_id,
//     "image_name": item.image_name 
// })


catalogImagesRouter
   .route('/images')
   // .all(requireAuth)
   .get((req, res, next) => {
     const knexInstance = req.app.get('db')
     CatalogImagesService.getAllImages(knexInstance, req)
       .then(catalog => {
         res.json(catalog.map(serializeCatalogImage))
       })
       .catch(next)
   })
   
   .post(upload.single('image'), (req, res, next) => {
     console.log("REQESTED FILE", req.file)
    //  console.log("requested body", req.body)
    //   const catalogImageItem ={
    //     user_id: req.body.user_id,
    //     image_name: req.file.originalname,
    //     catalog_id: req.body.catalog_id
    //   }
  
    // if (!req.body.image_name || !req.body.catalog_id) {
    //       return res
    //         .status(400)
    //         .json({
    //           error: { message: 'An image name and catalog item are required' }
    //         })
    //     }

    // CatalogImagesService.insertImage(
    //     req.app.get('db'),
    //     catalogImageItem
    //   )
    //   .then(item => {
    //     res
    //       .status(201)
    //       .json(serializeCatalogImageItem(item))
    //   })
      .catch(next)
    })  



module.exports = catalogImagesRouter



  
    
