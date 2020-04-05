const express = require('express')
const contactsRouter = express.Router()
const ContactsService = require('../contacts/contacts-service')
const { requireAuth } = require('../middleware/jwt-auth')
const bodyParser = express.json()


jsonParser = express.json()

const serializeContact = contact => ({
  "id": contact.id,
  "contact_type": contact.contact_type,
  "business_name": contact.business_name,
  "name": contact.name,
  "title": contact.title,
  "email": contact.email,
  "phone": contact.phone,
  "address_street": contact.address_street,
  "address_line2": contact.address_line2,
  "address_city": contact.address_city,
  "address_state": contact.address_state,
  "address_zip": contact.address_zip,
  "address_country": contact.address_country,
  "website": contact.website,
  "notes": contact.notes
})

contactsRouter
  .route('/contacts')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
  ContactsService.getAllContacts(knexInstance, req.query)
    .then(contact => {
      res.json(contact.map(serializeContact));
    })
    .catch(next)
  })

  .post(bodyParser, (req, res, next) => {
      const { user_id, contact_type, business_name, name, title, email, phone, address_street, address_line2, address_city, address_state, address_zip, address_country, website, notes } = req.body;
      const newContact = { user_id, contact_type, business_name, name, title, email, phone, address_street, address_line2, address_city, address_state, address_zip, address_country, website, notes }
      if (!name && !business_name) {
        return res
          .status(400)
          .json({
            error: { message: 'A name of business name is required'}
          }) 
      }

      newContact.user_id = req.body.user_id
      ContactsService.insertContact(
        req.app.get('db'),
        newContact
      )
      .then(item => {
        res
        .status(201)
        .location(`api/contact/${item.id}`)
        .json(serializeContact(item))
    })
        .catch(next)
    })

  
contactsRouter
  .route('/contacts/:id')
  .all((req, res, next) => {
    ContactsService.getById(
      req.app.get('db'),
      req.params.id
    )
      .then(item => {
      if(!item){
        return res.status(404).json({
          error:{message: 'Contact does not exist'}
        })
      }
      res.item = item
      next()
    })
    .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeContact(res.item))
  })

  .delete((req, res, next) => {
    ContactsService.deleteContactItem(
      req.app.get('db'),
      req.params.id
    )
      .then((numRowsAffected) => {
        res.status(204).end()
      })
      .catch(next)
    })

  .patch(jsonParser, (req, res, next) => {
    const { user_id, contact_type, business_name, name, title, events, email, phone, address_street, address_line2, address_city, address_state, address_zip, address_country, website, favorites, notes } = req.body;
    const contactToUpdate = { user_id, contact_type, business_name, name, title, events, email, phone, address_street, address_line2, address_city, address_state, address_zip, address_country, website, favorites, notes }

    const numberOfValues = Object.values(contactToUpdate).filter(Boolean).length
    if (numberOfValues === 0){
      return res.status(400).json({
        error: {message: "Request body must contain a value to update"}
      })
    }

    ContactsService.updateContactItem(
      req.app.get('db'),
      req.params.id,
      contactToUpdate
    )

    .then(numRowsAffected => {
      res.status(204).end()
    })
    .catch(next)

  })    


module.exports = contactsRouter