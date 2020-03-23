const express = require('express')
const CatalogImagesService = require('./catalog-images-service')
const catalogImageRouter = express.Router()
const bodyParser = express.json()
const { requireAuth } = require('../middleware/jwt-auth')
jsonParser = express.json()
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, './public/uploads');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

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

const upload = multer({ storage: storage, limits: {
  fileSize: 1024 * 1024 * 5,
  fileFilter: fileFilter
} }).single('images');


// const serializeCatalogImageItem = item => ({
//     "catalog_id": item.catalog_id,
//     "image_name": item.image_name 
// })


catalogImageRouter
   .route('/images')
   // .all(requireAuth)
   .get((req, res, next) => {
     const knexInstance = req.app.get('db')
     CatalogService.getAllImages(knexInstance)
       .then(catalog => {
         res.json(catalog.map(serializeCatalogImage))
       })
       .catch(next)
   })
   
   .post(bodyParser, upload, (req, res, next) => {
     console.log("REQ>BODY", req.file)
      CatalogImagesService.insertImage(
        req.app.get('db'),
        console.log("req.file === ", req.body.file)
      )
      
   })


  // .post(bodyParser, (req, res, next) => {

  //   const { event_id, catalog_id } = req.body;
  //   const newCatalogEventItem = { catalog_id, event_id}
  //   if (!event_id || !catalog_id) {
  //     return res
  //       .status(400)
  //       .json({
  //         error: { message: 'An event and catalog item are required' }
  //       })
  //   }

  //   newCatalogEventItem.user_id = user_id
  //   CatalogService.insertCatalogEntry(
  //     req.app.get('db'),
  //     newCatalogItem
  //   )
  //     .then(item => {
  //       res
  //         .status(201)
  //         .location(`api/catalog/${item.id}`)
  //         .json(serializeCatalogItem(item))
  //     })
  //     .catch(next)
  // })


// catalogEventRouter
//   .route('/catalog/:id')
//   .all(requireAuth)
//   .all((req, res, next) => {
//     CatalogService.getById(
//       req.app.get('db'),
//       req.params.id
//     )
//       .then(item => {
//         if (!item) {
//           return res.status(404).json({
//             error: { message: 'Catalog item does not exist' }
//           })
//         }
//         res.item = item
//         next()
//       })
//       .catch(next)
//   })

//   .get((req, res, next) => {
//     res.json(serializeCatalogItem(res.item))
//   })

//   .delete((req, res, next) => {
//     CatalogService.deleteCatalogItem(
//       req.app.get('db'),
//       req.params.id
//     )
//       .then((numRowsAffected) => {
//         res.status(204).end()
//       })
//       .catch(next)
//   })

//   .patch(jsonParser, (req, res, next) => {
//     const { user_id, type, collection, name, size, medium, price, date_created, concept_statement, notes, images, subject, quantity, location, sold_date, sold_to, history } = req.body;
//     const itemToUpdate = { user_id, type, collection, name, size, medium, price, date_created, concept_statement, notes, images, subject, quantity, location, sold_date, sold_to, history };

//     const numberOfValues = Object.values(itemToUpdate).filter(Boolean).length
//     if (numberOfValues === 0){
//       return res.status(400).json({
//         error: {message: "Request body must contain a value to update"}
//       })
//     }

//     CatalogService.updateCatalogItem(
//       req.app.get('db'),
//       req.params.id,
//       itemToUpdate
//     )
//       .then(numRowsAffected => {
//         res.status(204).end()
//       })
//       .catch(next)
//   })


module.exports = catalogImageRouter



  
  // const file = req.file
  // const name = req.body.name
  // if (!file){
  //   const error = new Error('Please select a file to upload')
  //   error.httpsStatusCode = 400
  //   return next(error)
  // }
  // req.send(file)
  // CatalogService.insertImage(
  //   req.app.get('db'),
  //   user_id = 1,
  //   //change this to be hte logged in user
  //   // image_name: req.body.name
  //   // catalog_id = req.body.catalog_id,
    
  // )
//   .then( res => {
//     res.status(204).send('Image uploaded successfully');
//   })
//   .catch(err => {
//     return res.status(500).json({
//       error: `Something went wrong`
//     })
//   })
//   .catch(next)
// })


// Add user details
