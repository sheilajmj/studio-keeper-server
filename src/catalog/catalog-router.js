const express = require('express')
const CatalogService = require('./catalog-service')
const catalogRouter = express.Router()
const bodyParser = express.json()
const { requireAuth } = require('../middleware/jwt-auth')
const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, './uploads/');
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
} })


jsonParser = express.json()

const serializeCatalogItem = catalog => ({
  "id": catalog.id,
  "type": catalog.type,
  "collection": catalog.collection,
  "name": catalog.name,
  "size": catalog.size,
  "medium": catalog.medium,
  "price": catalog.price,
  "date_created": catalog.date_created,
  "concept_statement": catalog.concept_statement,
  "notes": catalog.notes,
  //"images": catalog.images,
  "subject": catalog.subject,
  "quantity": catalog.quantity,
  "location": catalog.location,
  // "favorited_by": catalog.favorited_by,
  "sold_date": catalog.sold_date,
  "sold_to": catalog.sold_to,
  "history": catalog.history

})

const serializeCatalogImage = catalog => ({
  "image_name": catalog.image_name,
  "catalog_id": catalog.catalog_id
})

catalogRouter
  .route('/catalog')
  // .all(requireAuth)
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    CatalogService.getAllCatalogEntries(knexInstance)
      .then(catalog => {
        res.json(catalog.map(serializeCatalogItem))
      })
      .catch(next)
  })

  .post(bodyParser, (req, res, next) => {
    const { user_id, type, collection, name, size, medium, price, date_created, concept_statement, notes, images, subject, quantity, location, sold_date, sold_to, history } = req.body;
    const newCatalogItem = { user_id, type, collection, name, size, medium, price, date_created, concept_statement, notes, images, subject, quantity, location, sold_date, sold_to, history }
    if (!name) {
      return res
        .status(400)
        .json({
          error: { message: 'A name is required' }
        })
    }

    newCatalogItem.user_id = 1
    //change user_id value to logged in user_id
    CatalogService.insertCatalogEntry(
      req.app.get('db'),
      newCatalogItem
    )
      .then(item => {
        res
          .status(201)
          .location(`api/catalog/${item.id}`)
          .json(serializeCatalogItem(item))
      })
      .catch(next)
  })


catalogRouter
  .route('/catalog/:id')
  //.all(requireAuth)
  .all((req, res, next) => {
    CatalogService.getById(
      req.app.get('db'),
      req.params.id
    )
      .then(item => {
        if (!item) {
          return res.status(404).json({
            error: { message: 'Catalog item does not exist' }
          })
        }
        res.item = item
        next()
      })
      .catch(next)
  })

  .get((req, res, next) => {
    res.json(serializeCatalogItem(res.item))
  })

  .delete((req, res, next) => {
    CatalogService.deleteCatalogItem(
      req.app.get('db'),
      req.params.id
    )
      .then((numRowsAffected) => {
        res.status(204).end()
      })
      .catch(next)
  })

  .patch(jsonParser, (req, res, next) => {
    const { user_id, type, collection, name, size, medium, price, date_created, concept_statement, notes, images, subject, quantity, location, sold_date, sold_to, history } = req.body;
    const itemToUpdate = { user_id, type, collection, name, size, medium, price, date_created, concept_statement, notes, images, subject, quantity, location, sold_date, sold_to, history };

    const numberOfValues = Object.values(itemToUpdate).filter(Boolean).length
    if (numberOfValues === 0){
      return res.status(400).json({
        error: {message: "Request body must contain a value to update"}
      })
    }

    CatalogService.updateCatalogItem(
      req.app.get('db'),
      req.params.id,
      itemToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })


// upload profile image for user
catalogRouter
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

.post(bodyParser, upload.single('catalogImage'), (req, res, next) => {

  console.log(req.body, "FILE PATH?")
  CatalogService.insertImage(
    req.app.get('db'),
    // req.user.user_name,
    req.file.path,
  )
  .then( res => {
    res.status(204).send('Image uploaded successfully');
  })
  .catch(err => {
    return res.status(500).json({
      error: `Something went wrong`
    })
  })
  .catch(next)
})
// Add user details


module.exports = catalogRouter