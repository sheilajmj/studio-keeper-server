const express = require('express')
const CatalogService = require('./catalog-service')
const catalogRouter = express.Router()
const bodyParser = express.json()
const { requireAuth } = require('../middleware/jwt-auth')
const path = require('path')



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
  "subject": catalog.subject,
  "quantity": catalog.quantity,
  "location": catalog.location,
  "sold_date": catalog.sold_date,
  "sold_to": catalog.sold_to,
  "history": catalog.history

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
    const { user_id, type, collection, name, size, medium, price, date_created, concept_statement, notes, subject, quantity, location, sold_date, sold_to, history } = req.body;
    const newCatalogItem = { user_id, type, collection, name, size, medium, price, date_created, concept_statement, notes, subject, quantity, location, sold_date, sold_to, history }
    newCatalogItem.user_id = 1 

    if (!name) {
      return res
        .status(400)
        .json({
          error: { message: 'A name is required' }
        })
    }

    // newCatalogItem.user_id = 1
    // //change user_id value to logged in user_id
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
    const { user_id, type, collection, name, size, medium, price, date_created, concept_statement, notes, subject, quantity, location, sold_date, sold_to, history } = req.body;
    const itemToUpdate = { user_id, type, collection, name, size, medium, price, date_created, concept_statement, notes, subject, quantity, location, sold_date, sold_to, history };

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