const express = require('express');
const ContactsEventsService = require('./contacts-events-service');
const contactsEventsRouter = express.Router();
const bodyParser = express.json();
const { requireAuth } = require('../middleware/jwt-auth');
jsonParser = express.json();

const serializeContactsEventsItem = item => ({
    "contact_id": item.contact_id,
    "event_id": item.event_id, 
})


contactsEventsRouter
  .route('/contactsevents')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')

    ContactsEventsService.getContactsAndEvents(knexInstance, req.query)
    .then(response => {
      res.json(response.map(serializeContactsEventsItem))
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


module.exports = contactsEventsRouter