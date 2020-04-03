const express = require('express');
const aws = require('aws-sdk');
const bodyParser = require('body-parser');
const CatalogImagesService = require('../catalog-images-service')
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../../config')
const router = express.Router()
const serializeCatalogImage = catalog => ({
    "image_name": catalog.image_name,
    "catalog_id": catalog.catalog_id,
    "image_url": catalog.image_url
  })


aws.config.update({
    secretAccessKey:   config.AWS_SECRET_ACCESS_KEY,
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    region: 'us-west-1'
});

const s3 = new aws.S3();
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      res.json({
        error: `Wrong file type submitted. Upload only .png or .jpeg`
      })
      cb(null, false);
    }
  }

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.S3_BUCKET_NAME,
        acl:'public-read',
        key: function (req, file, cb) {
            const now = new Date().toISOString();
            const date = now.replace(/:/g, '-');
            console.log(file);
            cb(null, date + file.originalname); 
        }
    }),
    limits: {
        fileSize: 1024 * 1024 * 5,
        fileFilter: fileFilter
      }
})


router
.route('/image-upload')
.post(upload.single('image'), (req, res, next) => {
    const newCatalogImageData = { 
        user_id: 1,
        image_name: req.file.key,
        catalog_id: req.body.catalog_id,
        image_url: req.file.location
      } 
      CatalogImagesService.insertCatalogImageData(
            req.app.get('db'),
            newCatalogImageData
          )
          .then(item => {
            res
              .status(201)
              .json(serializeCatalogImage(item))
          })
          .catch(next)
})        
   





module.exports = router;