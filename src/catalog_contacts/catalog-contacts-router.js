const express = require('express')
const CatalogContactsService = require('./catalog-contacts-service')
const catalogContactsRouter = express.Router()
const bodyParser = express.json()
const { requireAuth } = require('../middleware/jwt-auth')
jsonParser = express.json()

const serializeCatalogContactsItem = item => ({
    "catalog_id": item.catalog_id,
    "contact_id": item.contact_id, 
})



catalogContactsRouter
  .route('/catalogcontacts')
  // .all(requireAuth)
  .get((req, res, next) => {
//   const { key, value } = req.body;
  const knexInstance = req.app.get('db')
    CatalogContactsService.getCatalogAndContacts(knexInstance)
      .then(response => {
          console.log("here is response", response)
        res.json(response.map(serializeCatalogContactsItem))
      })
      .catch(next)
  })

  .post(bodyParser, (req, res, next) => {

    const { contact_id, catalog_id } = req.body;
    const newCatalogContactItem = { catalog_id, contact_id}
    if (!contact_id || !catalog_id) {
      return res
        .status(400)
        .json({
          error: { message: 'A contact and catalog item are required' }
        })
    }
})

//     newCatalogEventItem.user_id = user_id
//     CatalogService.insertCatalogEntry(
//       req.app.get('db'),
//       newCatalogItem
//     )
//       .then(item => {
//         res
//           .status(201)
//           .location(`api/catalog/${item.id}`)
//           .json(serializeCatalogItem(item))
//       })
//       .catch(next)
//   })


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


module.exports = catalogContactsRouter