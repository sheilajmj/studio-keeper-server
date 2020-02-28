const express = require('express')
const eventsRouter = express.Router()
const bodyParser = express.json()
const events = [
    {
      "event_id": "001",
      "event_type": "art show",
      "name": "ArtyArt",
      "website": "http://www.event3.com",
      "location": "Lone Tree",
      "event_dates": "02/19/2020",
      "application_due_date": "01/01/2020",
      "contact": ["003"],
      "notes": "This is the show Jane Doe told me about",
      "submission_requirements": "Letter of interest, images, application",
      "catalog_items": ["001", "002", "003"]
    },
    {
      "event_id": "002",
      "event_type": "Competition",
      "name": "fancy Name",
      "website": "http://www.event2.com",
      "location": "Northern Colorado",
      "event_dates": "08/10/2020",
      "application_due_date": "03/01/2020",
      "contact": ["002"],
      "notes": "This is a note about this competition",
      "submission_requirements": "digital entry, application",
      "catalog_items": ["001"]
    },
    {
      "event_id": "003",
      "event_type": "Fair",
      "name": "Holiday Fair",
      "website": "http://www.event.com",
      "location": "North Pole",
      "event_dates": "12/23/2020",
      "application_due_date": "10/01/2020",
      "contact": ["003"],
      "notes": "This is a note and sounds interesting",
      "submission_requirements": "application, table fee",
      "catalog_items": ["001", "002", "003"]
    }
  
  ]
const uuid = require('uuid/v4');
const logger = require('../logger')

eventsRouter
  .route('/events')
  .get((req, res) => {
    res
      .json(events);
  })

  .post(bodyParser, (req, res) => {

      const { event_type, name, website, location, event_dates, application_due_date, contact, notes, submission_requirements, catalog_items } = req.body;

      if (!name && !business_name) {
        logger.error(`name or business name is required`);
        return res
          .status(400)
          .send('Invalid data');
      }

      const event_id = uuid();
      const event = {
        event_id,
        event_type,
        name,
        website,
        location,
        event_dates,
        application_due_date,
        contact,
        notes,
        submission_requirements,
        catalog_items,
      }
      events.push(event);
      logger.info(`event with id ${event_id} created`);

      res
        .status(201)
        .location(`http://localhost:3000/events/${event_id}`)
        .json(event);
    })

  


eventsRouter
  .route('/events/:id')
  .get((req, res) => {
    const { id } = req.params;
    const event = events.find(event => event.event_id == id)
    res
      .json(event)
  })

  .delete((req, res) => {
    const { id } = req.params;

    const eventsIndex = events.findIndex(event => event.event_id == id);

    events.splice(eventsIndex, 1);
    res
      .status(204)
      .end();
  })


module.exports = eventsRouter