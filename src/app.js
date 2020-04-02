require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const aws = require('aws-sdk');
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
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
const catalogImageDataRouter = require('./catalog_images/catalog-images-router')
const catalogImagesRouter = require('./catalog_images/catalog-images-router')
const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

//const path = require('path');

const S3_BUCKET = process.env.S3_BUCKET;

aws.config.region = 'us-west-1';

app.get('/accounts', (req, res) => res.render('account.html'));

app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

app.post('/save-details', (req, res) => {
  // TODO: Read POSTed form data and do something useful
});

app.use(cors())

app.set('views', './views');

app.use(morgan(morganOption));
app.use(express.static('./public'));
app.engine('html', require('ejs').renderFile);
app.listen(process.env.PORT || 3000);
//app.use(express.static(path.join(__dirname + '../../..' + '/public/uploads/')))
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






