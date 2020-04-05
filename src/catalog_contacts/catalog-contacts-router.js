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
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    CatalogContactsService.getCatalogAndContacts(knexInstance, req.query)
      .then(response => {
        res.json(response.map(serializeCatalogContactsItem))
      })
      .catch(next)
  })

  .post(bodyParser, (req, res, next) => {

    const { contact_id, catalog_id } = req.body;
    const newCatalogContactItem = { catalog_id, contact_id }
    if (!contact_id || !catalog_id) {
      return res
        .status(400)
        .json({
          error: { message: 'A contact and catalog item are required' }
        })
    }
  })

module.exports = catalogContactsRouter