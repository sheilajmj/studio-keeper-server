const express = require('express')
const eventsRouter = express.Router()
const bodyParser = express.json()
const EventsService = require('./events-service')
const serializeEventItem = event => ({
      "id": event.id,
      "event_type": event.type,
      "name": event.name,
      "website": event.website,
      "location": event.location,
      "event_dates": event.dates,
      "application_due_date": event.application_due_date,
      "notes": event.notes,
      "submission_requirements": event.submission_requirements,
    })
    

eventsRouter
  .route('/events')
  //.all(requireAuth)
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    EventsService.getAllEvents(knexInstance)
    .then(event => {
      res.json(event.map(serializeEventItem))
    })
    .catch(next)
})

  .post(bodyParser, (req, res) => {
      const { event_type, name, website, location, event_dates, application_due_date, notes, submission_requirements } = req.body;
      const newEventItem = {event_type, name, website, location, event_dates, application_due_date, notes, submission_requirements }
      if (!name) {
        return res
        .status(400)
        .json({
          error: {message: 'Must include an event name in a new event entry'}
        })
      }
  
      newEventItem.user_id = user_id
      EventService.insertEventItem(
        req.app.get('db'),
        newEventItem
      )
     .catch(next)
    })
    

eventsRouter
  .route('/events/:id')
 // .all(requireAuth)
    .all((req, res, next) => {
      EventsService.getById(
      req.app.get('db'),
      req.params.id
    )
      .then(event => {
        if (!event) {
          return res.status(404).json({
            error: {message: 'Event does not exist'}
          })
        }
        res.event = event
        next()
      })
      .catch(next)
    })


  .get((req, res) => {
    res.json(seralizeEventItem(res.event))  
  })

  .delete((req, res, next) => {
    EventsService.deleteEventItem(
      req.app.get('db'),
      req.params.id
      )
    .then((numRowsAffected) => {
      res.status(204).end()
    })
    .catch(next)
  })

  .patch(jsonParser, (req, res, next) => {
    const { event_type, name, website, location, event_dates, application_due_date, notes, submission_requirements } = req.body;
    const eventToUpdate = {event_type, name, website, location, event_dates, application_due_date, notes, submission_requirements }

    const numberOfValues = Object.values(eventToUpdate).filter(Boolean).length
    if (numberOfValues === 0){
      return res.status(400).json({
        error: {message: "Request body must contain a value to update"}
      })
    }
  
    EventsService.updateEventItem(
      req.app.get('db'),
      req.params.id, 
      eventToUpdate
    )

    .then(numRowsAffected => {
      res.status(204).end()
    })
    .catch(next)
  })

module.exports = eventsRouter