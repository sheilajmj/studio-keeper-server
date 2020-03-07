const express = require('express')
const CatalogService = require('./catalog-service')
const catalogRouter = express.Router()
const bodyParser = express.json()
const { requireAuth } = require('../middleware/jwt-auth')
jsonParser = express.json()

const serializeCatalogEventsItem = item => ({
    "catalog_id": item.catalog_id,
    "event_id": item.event_id, 
})



catalogEventRouter
  .route('/catalog-events')
  // .all(requireAuth)
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    CatalogService.getAllCatalogEntries(knexInstance)
      .then(catalog => {
        res.json(catalog.map(serializeCatalogEventsItem))
      })
      .catch(next)
  })

  .post(bodyParser, (req, res, next) => {

    const { event_id, catalog_id } = req.body;
    const newCatalogEventItem = { catalog_id, event_id}
    if (!event_id || !catalog_id) {
      return res
        .status(400)
        .json({
          error: { message: 'An event and catalog item are required' }
        })
    }

    newCatalogEventItem.user_id = user_id
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


catalogEventRouter
  .route('/catalog/:id')
  .all(requireAuth)
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


module.exports = catalogRouter