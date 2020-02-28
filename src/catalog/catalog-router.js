const express = require('express')
const catalogRouter = express.Router()
const bodyParser = express.json()
const catalog = [
    {
      "catalog_id": "001",
      "type": "Dyed Yarn",
      "collection": "Naturally Dyed",
      "name": "Pot of Gold",
      "size": "180yd",
      "medium": "sock weight, sheep wool",
      "price": "$35",
      "date_created": "12/2019",
      "concept_statement": "This is a concept statement for this work",
      "notes": "I created this in a bus heading to the moon",
      "images": "3390767231_0984b30393_o.jpg",
      "subject": "",
      "quantity": "4",
      "location": "kept in studio",
      "favorited_by": ["001", "002", "003"],
      "sold_date": "01/26/2020",
      "sold_to": "event attendee",
      "events": ["001"],
      "history": "1/26/2020 Allstar Show"
    },
    {
      "catalog_id": "002",
      "type": "sculpture",
      "collection": "Yesterdays mess",
      "name": "Once in time",
      "size": "4in x 2in",
      "medium": "toothpaste, tissue",
      "Price": "$25",
      "date_created": "03/2009",
      "concept_statement": "Toothpaste reimagined is the concept statement",
      "notes": "This was inspired by the stars",
      "images": "kxgAbEPRrc.jpg",
      "subject": "sunset",
      "quantity": "1",
      "location": "Storage Unit B",
      "favorited_by": ["001", "002", "003"],
      "sold_date": "",
      "sold_to": "",
      "events": ["003"],
      "history": ""
    },
    {
      "catalog_id": "003",
      "type": "sewing",
      "collection": "canvas bags",
      "name": "Tote",
      "size": "4in x 8in x 3in",
      "medium": "canvas, beeswax",
      "Price": "$180",
      "date_created": "02/2020",
      "concept_statement": "Concept here",
      "notes": "",
      "images": "phuong-tran-zh1THZy8cQU.jpg, henry-co-5IR2yTaS8kg.jpg",
      "subject": "",
      "quantity": "1",
      "location": "on display at Herch Coffee until 4/12/2020",
      "favorited_by": ["001", "002", "003"],
      "sold_date": "",
      "sold_to": "",
      "events": ["001"],
      "history": "1/26/2020 Allstar Show"
    }
  ]
const uuid = require('uuid/v4');
const logger = require('../logger')


catalogRouter
  .route('/catalog')
  .get((req, res) => {
    res
      .json(catalog);
  })

  .post(bodyParser, (req, res) => {

      const { type, collection, name, size, medium, price, date_created, concept_statement, notes, images, subject, quantity, location, favorited_by, sold_date, sold_to, events, history } = req.body;

      if (!name) {
        logger.error(`name or business name is required`);
        return res
          .status(400)
          .send('Invalid data');
      }

      const catalog_id = uuid();
      const catalog_item = {
        catalog_id,
        type,
        collection,
        name,
        size,
        medium,
        price,
        date_created,
        concept_statement,
        notes,
        images,
        subject,
        quantity,
        location,
        favorited_by,
        sold_date,
        sold_to,
        events,
        history
      }
      catalog.push(catalog_item);
      logger.info(`Catalog entry with id ${catalog_id} created`);

      res
        .status(201)
        .location(`http://localhost:3000/catalog/${catalog_id}`)
        .json(catalog_item);
    })

  
catalogRouter
  .route('/catalog/:id')
  .get((req, res) => {
    const { id } = req.params;
    const catalog_item = catalog.find(catalog => catalog.catalog_id == id)
    res
      .json(catalog_item)
  })

  .delete((req, res) => {
    const { id } = req.params;

    const catalogIndex = catalog.findIndex(catalog => catalog.catalog_id == id);

    catalog.splice(catalogIndex, 1);
    res
      .status(204)
      .end();
  })


module.exports = catalogRouter