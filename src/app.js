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
const logger = require('../logger')

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';


app.use(cors({
  origin: CLIENT_ORIGIN
})
)
app.use(morgan(morganOption))
app.use(helmet())

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('Authorization')

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    logger.error(`Unauthorized request to path: ${req.path}`);
    return res.status(401).json({ error: 'Unauthorized request' })
  }
  // move to the next middleware
  next()
})

app.use('/api', contactsRouter)
app.use('/api', catalogRouter)
app.use('/api', eventsRouter)
// app.use('/api', usersRouter)
// app.get('/api/*', (req, res) => {
//   res.json({ ok: true });
// });

// app.get('/', (req, res) => {
//   res.send('Hello, world!')
// })


app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})



module.exports = app