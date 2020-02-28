const express = require('express')
const contactsRouter = express.Router()
const bodyParser = express.json()
const contacts = [{
  "contact_id": "001",
  "contact_type": "Individual",
  "business_name": "Craftwork",
  "name": "Dear T",
  "title": "Founder",
  "events": [],
  "email": "dearT@email.com",
  "phone": "303.555.5555",
  "address_street": "2323 Arm St.",
  "address_line2": "",
  "address_city": "Seven Hills",
  "address_state": "CO",
  "address_zip": "80881",
  "address_country": "USA",
  "website": "https://www.website.com",
  "favorites": ["001", "002"],
  "notes": "here is a note for my contact"
},
{
  "contact_id": "002",
  "contact_type": "Business",
  "business_name": "Craftwork",
  "name": "A Name",
  "title": "",
  "events": ["002"],
  "email": "craftwork@craftwork.com",
  "phone": "222-893-8873",
  "address_street": "1011 Leg St.",
  "address_line2": "#40",
  "address_city": "LakeAli",
  "address_state": "CA",
  "address_zip": "70221",
  "address_country": "USA",
  "website": "https://www.website2.com",
  "favorites": ["001"],
  "notes": "Note 2 here is a note for my contact"
},
{
  "contact_id": "003",
  "contact_type": "Business",
  "business_name": "PaintFlow",
  "name": "",
  "title": "",
  "events": ["003", "001"],
  "email": "info@allstarshow.com",
  "phone": "101-993-3399",
  "address_street": "107 Shoulder St.",
  "address_line2": "",
  "address_city": "City1",
  "address_state": "WA",
  "address_zip": "90912",
  "address_country": "USA",
  "website": "https://www.allstarshow.com",
  "favorites": ["002", "001", "003"],
  "notes": "This is note 3"
}
]
const uuid = require('uuid/v4');
const logger = require('../../logger')
contactsRouter
  .route('/contacts')
  .get((req, res) => {
    res
      .json(contacts);
  })

  .post(bodyParser, (req, res) => {

      const { contact_type, business_name, name, title, events, email, phone, address_street, address_line2, address_city, address_state, address_zip, address_country, website, favorites, notes } = req.body;

      if (!name && !business_name) {
        logger.error(`name or business name is required`);
        return res
          .status(400)
          .send('Invalid data');
      }

      const contact_id = uuid();
      const contact = {
        contact_id,
        contact_type,
        business_name,
        name,
        title,
        events,
        email,
        phone,
        address_street,
        address_line2,
        address_city,
        address_state,
        address_zip,
        address_country,
        website,
        favorites,
        notes
      }
      contacts.push(contact);
      logger.info(`Contact with id ${contact_id} created`);

      res
        .status(201)
        .location(`http://localhost:3000/contacts/${contact_id}`)
        .json(contact);
    })

  


contactsRouter
  .route('/contacts/:id')
  .get((req, res) => {
    const { id } = req.params;
    const contact = contacts.find(contact => contact.contact_id == id)
    res
      .json(contact)
  })

  .delete((req, res) => {
    const { id } = req.params;

    const contactsIndex = contacts.findIndex(contact => contact.contact_id == id);

    contacts.splice(contactsIndex, 1);
    res
      .status(204)
      .end();
  })


module.exports = contactsRouter