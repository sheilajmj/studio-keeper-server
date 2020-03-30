const express = require('express')
const CatalogEventsService = require('./catalog-events-service')
const catalogEventsRouter = express.Router()
const bodyParser = express.json()
const { requireAuth } = require('../middleware/jwt-auth')
jsonParser = express.json()

const serializeCatalogEventsItem = item => ({
    "catalog_id": item.catalog_id,
    "event_id": item.event_id, 
})


catalogEventsRouter
  .route('/catalogevents')
   .get((req, res, next) => {
    const knexInstance = req.app.get('db')

    CatalogEventsService.getCatalogAndEvents(knexInstance, req.query)
    .then(response => {
      res.json(response.map(serializeCatalogEventsItem))
    })
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


module.exports = catalogEventsRouter