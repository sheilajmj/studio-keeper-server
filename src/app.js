require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const { CLIENT_ORIGIN } = require('./config');
const app = express()
app.use(express.json());
const contactsRouter = require('./contacts/contacts-router')
const catalogRouter = require('./catalog/catalog-router')
const eventsRouter = require('./events/events-router')
const catalogEventsRouter = require('./catalog_events/catalog-events-router')
const catalogContactsRouter = require('./catalog_contacts/catalog-contacts-router')
const contactsEventsRouter = require('./contacts_events/contacts-events-router')
const authRouter = require('./auth/auth-router')
const usersRouter = require('./Users/users-router')
const s3Router = require('./catalog_images/s3Upload/s3Upload')
const catalogImageDataRouter = require('./catalog_images/catalog-images-router')
const catalogImagesRouter = require('./catalog_images/catalog-images-router')
const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

const path = require('path');

app.use(cors())

app.use(morgan(morganOption))
app.use(express.static(path.join(__dirname + '../../..' + '/public/uploads/')))
app.use(helmet())

app.use('/api', contactsRouter)
app.use('/api', catalogRouter)
app.use('/api', eventsRouter)
app.use('/api', catalogEventsRouter)
app.use('/api', catalogContactsRouter)
app.use('/api', catalogImagesRouter)
app.use('/api', contactsEventsRouter)
app.use('/api/auth', authRouter)
app.use('/api', usersRouter)
app.use('/api', catalogImageDataRouter)
app.use('/api', s3Router)




app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
    console.error(error)
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})


module.exports = app






