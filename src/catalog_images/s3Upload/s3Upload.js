const express = require('express');
const aws = require('aws-sdk');
const bodyParser = require('body-parser');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../../config')

aws.config.update({
    secretAccessKey:   config.AWS_SECRET_ACCESS_KEY,
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    region: 'us-west-1'
});

const s3 = new aws.S3();
app.use(bodyParser.json());
const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: config.S3_BUCKET_NAME,
        key: function (req, file, cb) {
            const now = new Date().toISOString();
            const date = now.replace(/:/g, '-');
            console.log(file);
            cb(null, date + file.originalname); 
        }
    })
})

router
.route('/image-upload')
.post(upload.single('image'), (req, res, next) => {
    const newCatalogImageData = { 
      user_id: 1,
      image_name: req.file.filename,
      catalog_id: req.body.catalog_id,
      image_url: req.file.path
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
